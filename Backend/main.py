from flask import Flask, request, jsonify, send_file#type:ignore
from flask_cors import CORS#type:ignore
import concurrent.futures
import os
from pdf2docx import Converter#type:ignore
import logging

app = Flask(__name__)
CORS(app)

# Directory to store converted files
output_directory = 'Downloads'
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Logging configuration
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Dictionary to keep track of conversion status
conversion_status = {}

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