from flask import Flask, request, jsonify, send_file#type:ignore
from flask_cors import CORS#type:ignore
import concurrent.futures
import os
from pdf2docx import Converter#type:ignore
from PyPDF2 import PdfMerger#type:ignore
import logging
from io import BytesIO
import threading

app = Flask(__name__)
CORS(app)
executor = concurrent.futures.ThreadPoolExecutor(max_workers=5)
output_directory = 'Downloads'
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

conversion_status = {}

# NORMAL FUNCTION
def convert_pdf_to_docx(pdf_file, docx_file):
    try:
        cv = Converter(pdf_file)
        cv.convert(docx_file, start=1, end=None)
        cv.close()
        logging.info(f"Successfully converted {pdf_file} to {docx_file}")
        conversion_status[docx_file] = 'completed'
    except Exception as e:
        logging.error(f"Error converting {pdf_file} to {docx_file}: {str(e)}")
        conversion_status[docx_file] = 'failed'

def merge_files(files):
    merger = PdfMerger()
    merged_pdf_stream = BytesIO()

    try:
        for pdf_file in files:
            merger.append(pdf_file)
        
        merger.write(merged_pdf_stream)
        merger.close()
        merged_pdf_stream.seek(0)
        
        return merged_pdf_stream

    except Exception as e:
        print(f"Error merging files: {e}")
        return None

# FLASK APIS
@app.route('/convert', methods=['POST'])
def convert():
    try:
        pdf_file = request.files['file']
        if pdf_file and pdf_file.filename.endswith('.pdf'):
            pdf_filename = pdf_file.filename
            pdf_path = os.path.join(output_directory, pdf_filename)
            pdf_file.save(pdf_path)

            docx_filename = pdf_filename.replace('.pdf', '.docx')
            docx_path = os.path.join(output_directory, docx_filename)

            conversion_status[docx_path] = 'in_progress'

            # Using ThreadPoolExecutor for parallel conversion
            with concurrent.futures.ThreadPoolExecutor() as executor:
                executor.submit(convert_pdf_to_docx, pdf_path, docx_path)

            return jsonify({"message": f"File has been downloaded", "docx_file": docx_filename}), 202
        else:
            return jsonify({"error": "Invalid file format. Please upload a PDF file."}), 400
    except Exception as e:
        logging.error(f"Error during conversion: {str(e)}")
        return jsonify({"error": str(e)}), 500


# Create a thread pool executor
@app.route('/merge_pdfs', methods=['POST'])
def merge_pdfs():
    if 'files' not in request.files:
        return {'error': 'No files part in the request'}, 400

    files = request.files.getlist('files')

    if not files or len(files) == 0:
        return {'error': 'No files uploaded'}, 400

    # Use a thread pool to handle the merging task
    future = executor.submit(merge_files, files)
    merged_pdf_stream = future.result()

    if not merged_pdf_stream:
        return {'error': 'Failed to merge PDFs'}, 500

    return send_file(
        merged_pdf_stream,
        as_attachment=True,
        download_name='merged_document.pdf',
        mimetype='application/pdf'
    )

# DOWNLOAD OUTPUTS
@app.route('/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        docx_path = os.path.join(output_directory.replace("./Backend/",""), filename)
        if conversion_status.get(docx_path) == 'completed':
            return send_file(docx_path, as_attachment=True)
        elif conversion_status.get(docx_path) == 'in_progress':
            return jsonify({"message": "Conversion is still in progress. Please try again later."}), 202
        else:
            return send_file(docx_path, as_attachment=True)
    except FileNotFoundError as e:
        logging.error(f"File not found: {filename} - {str(e)}")
        return jsonify({"error": f"Your File {filename} is no found"}), 404
    except Exception as e:
        logging.error(f"Error downloading file: {filename} - {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, threaded=True)