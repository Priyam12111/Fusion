import React, { useEffect, useState } from 'react';
import axios from 'axios';
const PDFmerger = ({ mode }) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    useEffect(() => {
        document.title = 'Fusion - PDF Merge';
    }, []);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);  // Update state with selected file
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:5000/rotate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage(response.data.message);
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Failed to upload file.');
        }
    };

    return (
        <div className={`search_container bg-${mode} text-${mode === "dark" ? "light" : "dark"}`}>
            <input type="file" name="pdf" id="PdfUpload" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload PDF</button>
            {message && <p>{message}</p>}
        </div>
    );
};


export default PDFmerger