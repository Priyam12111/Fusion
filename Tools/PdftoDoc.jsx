import React, { useState } from 'react';
import axios from 'axios';

const PdftoDoc = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);  // Update state with selected file
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:5000/convert', formData, {
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
        <div className="search_container">
            {/* Add onChange handler to input element */}
            <input type="file" name="pdf" id="PdfUpload" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload PDF</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PdftoDoc;
