import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PDFmerger = ({ mode }) => {
    const [files, setFiles] = useState([]); // Initialize files as an empty array
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.title = 'Fusion | Merge PDF | Combine Multiple PDF';
    }, []);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
        setFiles(selectedFiles);
    };

    const handleReorder = (index, direction) => {
        const newFiles = [...files];
        const [movedFile] = newFiles.splice(index, 1);
        if (direction === 'up') {
            newFiles.splice(index - 1, 0, movedFile);
        } else if (direction === 'down') {
            newFiles.splice(index + 1, 0, movedFile);
        }
        setFiles(newFiles);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setMessage('Please select at least one PDF file.');
            return;
        }

        try {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('files', file);
            });

            const response = await axios.post('https://priyam144.pythonanywhere.com/merge_pdfs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
            <input
                type="file"
                name="pdf"
                id="PdfUpload"
                multiple
                accept="application/pdf"
                onChange={handleFileChange}
            />

            {files.length > 0 && (
                <div>
                    <h3>Reorder Files:</h3>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>
                                {file.name}
                                <button className='mx-1'
                                    onClick={() => handleReorder(index, 'up')}
                                    disabled={index === 0}
                                >
                                    Up
                                </button>
                                <button
                                    onClick={() => handleReorder(index, 'down')}
                                    disabled={index === files.length - 1}
                                >
                                    Down
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                className="button-67"
                role="button"
                style={{
                    backgroundColor: `${mode === "dark" ? "#040400" : "#f5f5fa"}`,
                    color: '#9c8fe1',
                }}
                onClick={handleUpload}
            >
                Upload
            </button>

            {message && <div className='m-5 p-1 bg-dark3'>{message}</div>}
        </div>
    );
};

export default PDFmerger;
