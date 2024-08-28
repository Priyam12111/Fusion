import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
export default function ({ mode, toggle }) {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 0.3s ease',
      backgroundColor: `${mode.bg == "light" ? "white" : "rgb(33 37 41)"}`,
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '25px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: `${mode.bg == "dark" ? "white" : "#333"}`,
      color: `${mode.bg == "dark" ? "#333" : "white"}`,  // White text color
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    }
  };
  return (
    <div className="navbar">
      <nav style={{ borderBottom: "1px solid white", padding: "10px" }} className={`navbar navbar-expand-lg navbar-${mode.bg} bg-${mode.bg} `}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            ✡️Fusion
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </NavLink>
                <ul className={`dropdown-menu bg-${mode.bg} text-${mode.bg === "dark" ? "light" : "dark"}`}>
                  <li>
                    <NavLink className={`dropdown-item bg-${mode.bg} text-${mode.bg === "dark" ? "light" : "dark"}`} to="/pdf_to_docx">
                      PDF to WORD
                    </NavLink>
                  </li>
                  <li>
                    <hr className={`dropdown-divider ${mode.bg === "dark" ? "bg-light" : ""}`} />
                  </li>
                  <li>
                    <NavLink className={`dropdown-item bg-${mode.bg} text-${mode.bg === "dark" ? "light" : "dark"}`} to="/Auto-PDF-Rotater">
                      AI PDF ROTATE
                    </NavLink>
                  </li>
                  <li>
                    <hr className={`dropdown-divider ${mode.bg === "dark" ? "bg-light" : ""}`} />
                  </li>
                  <li>
                    <NavLink className={`dropdown-item bg-${mode.bg} text-${mode.bg === "dark" ? "light" : "dark"}`} to="/merge_pdf">
                      MERGE PDF
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/Apps">
                  Tools
                </NavLink>
              </li>
            </ul>
            <li>
              <div onClick={toggle} style={styles.container}>
                <input type="button" value={`${mode.bg == "light" ? "Dark" : "Light"} Mode`} style={styles.button} />
              </div>

            </li>

            <form className="d-flex " role="search">
              <input
                className={`form-control me-2 bg-${mode.bg} text-${mode.bg == "light" ? "dark" : "light"}`}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

    </div>
  )
}
