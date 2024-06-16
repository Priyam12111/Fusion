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
            <div className="cards">
                <div className="p2w card">
                    <NavLink to={"/PdftoDoc"}>
                        <h2>
                            PDF to Word Conversion
                        </h2>
                    </NavLink>
                </div>
                <div className="card">
                    <h2>Card 2</h2>
                </div>
                <div className="card">
                    <h2>Card 3</h2>
                </div>
            </div>

        </div >
    )
}

export default AllApps