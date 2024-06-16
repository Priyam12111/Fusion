import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
export default function Home({ mode }) {
    useEffect(() => {
        document.title = 'Fusion - Home';
    }, []);
    return (
        <div className="container">
            <div className={`jumbotron p-3 p-md-5 text-${mode === "dark" ? "light" : "dark"} rounded bg-${mode}`}>
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">
                        Enhance Your PDF Handling Skills
                    </h1>
                    <p className="lead my-3">
                        Unlock the power of PDF manipulation with our expert tips and tools. Whether you're merging documents, extracting data, or securing sensitive information, we have you covered.
                    </p>
                    <p className="lead mb-0">
                        <NavLink to="#" className="text-white font-weight-bold">
                            Discover More
                        </NavLink>
                    </p>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="card flex-md-row mb-4 box-shadow h-md-250">
                        <div className="card-body d-flex flex-column align-items-start  bg-light">
                            <strong className="d-inline-block mb-2 text-primary">Tools</strong>
                            <h3 className="mb-0">
                                <NavLink className="text-dark" to="/Apps">
                                    Top Tools for PDF Editing
                                </NavLink>
                            </h3>
                            <div className="mb-1 text-muted">June 1</div>
                            <p className="card-text mb-auto">
                                Dive into our comprehensive guide on the best tools available for editing PDFs. From free software to professional solutions, find the perfect fit for your needs.
                            </p>
                            <a href="#">Read More</a>
                        </div>

                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card flex-md-row mb-4 box-shadow h-md-250">
                        <div className="card-body d-flex flex-column align-items-start bg-light">
                            <strong className="d-inline-block mb-2 text-success">Techniques</strong>
                            <h3 className="mb-0">
                                <a className="text-dark" href="#">
                                    Advanced PDF Data Extraction Methods
                                </a>
                            </h3>
                            <div className="mb-1 text-muted">May 28</div>
                            <p className="card-text mb-auto">
                                Explore cutting-edge techniques for extracting and manipulating data from PDFs. Learn how to automate workflows and increase efficiency in your document processing.
                            </p>
                            <a href="#">Learn More</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
