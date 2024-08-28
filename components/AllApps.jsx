import React from 'react'
import { NavLink } from 'react-router-dom'
const AllApps = ({ mode }) => {
    return (

        <div className='main-container'>
            <div style={{ height: "200px", justifyContent: "center", display: "flex", alignItems: "center" }} className={`jumbotron jumbotron-fluid bg-${mode === "dark" ? "light" : "dark"} text-${mode}`}>
                <div className="container">
                    <div className="heading">
                        <h1 className="display-4">Tools 🔨</h1>
                        <p className="lead">
                            The following tools are very sharp, Please feel free to use them and get ahead in your professional workflows.
                        </p>
                    </div>
                </div>
            </div >
            <div className="cards mt-3">
                <NavLink className="p2w card" to="/pdf_to_docx">
                    <NavLink to="/pdf_to_docx">
                        <h2>PDF to Word Conversion</h2>
                    </NavLink>
                </NavLink>

                <NavLink className="apr card" to="/Auto-PDF-Rotater">
                    <NavLink to="/Auto-PDF-Rotater">
                        <h2>Auto PDF Rotate</h2>
                    </NavLink>
                </NavLink>

                <NavLink className="pdfm card" to="/merge_pdf">
                    <NavLink to={"/PDF-Merge"}>
                        <h2>
                            PDF Merge
                        </h2>
                    </NavLink>
                </NavLink>

            </div>

        </div >
    )
}

export default AllApps