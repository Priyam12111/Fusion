import React, { useEffect, useState } from 'react';
import axios from 'axios';
const PDFmerger = ({ mode }) => {
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.title = 'Fusion - PDF Merge';
    }, []);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setMessage('Please select at least one PDF file.');
            return;
        }

        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            const response = await axios.post('http://localhost:5000/merge_pdfs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'merged_document.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();

            setMessage('PDFs merged successfully!');

        } catch (error) {
            console.error('Error uploading files:', error);
            setMessage('Failed to upload files.');
        }
    };

    return (
        <div className={`search_container bg-${mode} text-${mode === "dark" ? "light" : "dark"}`}>
            <input type="file" name="pdf" id="PdfUpload" multiple accept="application/pdf" onChange={handleFileChange} />
            <button class="button-67" role="button" style={{ backgroundColor: `${mode == "dark" ? "#040400" : "#f5f5fa"}`, color: '#9c8fe1' }} onClick={handleUpload}>Upload</button>
            {message && <div className='m-5 p-1 bg-dark3'>{message}</div>}
        </div>
    );
};


export default PDFmerger