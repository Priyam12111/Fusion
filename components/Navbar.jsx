import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
export default function ({ mode, toggle }) {

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
                    <NavLink className={`dropdown-item bg-${mode.bg} text-${mode.bg === "dark" ? "light" : "dark"}`} to="/PdftoDoc">
                      PDF to Word
                    </NavLink>
                  </li>
                  <li>
                    <hr className={`dropdown-divider ${mode.bg === "dark" ? "bg-light" : ""}`} />
                  </li>
                  <li>
                    <NavLink className={`dropdown-item bg-${mode.bg} text-${mode.bg === "dark" ? "light" : "dark"}`} to="/Auto-PDF-Rotater">
                      Auto PDF Rotator
                    </NavLink>
                  </li>
                  <li>
                    <hr className={`dropdown-divider ${mode.bg === "dark" ? "bg-light" : ""}`} />
                  </li>
                  <li>
                    <NavLink className={`dropdown-item bg-${mode.bg} text-${mode.bg === "dark" ? "light" : "dark"}`} to="/PDF-Merge">
                      PDF Merge
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link disabled" aria-disabled="true">
                  Experimental
                </NavLink>
              </li>
            </ul>
            <li>
              <button type="button" className="btn btn-primary" onClick={toggle}>{mode.btn}</button>
            </li>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
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
