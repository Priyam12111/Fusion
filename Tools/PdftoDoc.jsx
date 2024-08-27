import React, { useEffect, useState } from 'react';
import axios from 'axios';
const PdftoDoc = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    useEffect(() => {
        document.title = 'Fusion - PDF to Doc';
    }, []);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);  // Update state with selected file
    };

    const handleUpload = async () => {
        try {
            setMessage("File Uploading 1/1")
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('https://priyam144.pythonanywhere.com/convert', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // If upload is successful, start the download process
            if (response.status === 202) {  // Ensure the status code is correct for processing
                setMessage(response.data.message);
                await handleDownload(response.data.docx_file);
            } else {
                setMessage('Unexpected response from the server.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Failed to upload file.');
        }
    };
    const handleDownload = async (filename) => {
        try {
            const response = await axios.get(`https://priyam144.pythonanywhere.com/download/${filename}`, {
                responseType: "blob"
            })
            setMessage("File download is starting in 3 seconds...");

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);  // Set the filename for the downloaded file
            document.body.appendChild(link);
            link.click();

            // Clean up by revoking the object URL and removing the temporary link
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
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
