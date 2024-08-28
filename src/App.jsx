import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from '../components/Navbar'
import Home from '../components/Home';
import PdftoDoc from '../Tools/PdftoDoc';
import PdfRotator from '../Tools/PdfRotator';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AllApps from '../components/AllApps';
import PDFmerger from '../Tools/PDFmerger';
function App() {
  const [mode, setmode] = useState({
    bg: "light",
    btn: "Dark"
  });

  const toggle = () => {
    setmode(mode => ({
      bg: mode.bg === "light" ? "dark" : "light",
      btn: mode.btn === "Dark" ? "Light" : "Dark",
    }));
  };

  useEffect(() => {
    document.title = 'Fusion - Services';
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div className={`bg-${mode.bg}2 main`}>
        <Navbar mode={mode} toggle={toggle} />
        <Home mode={mode.bg} />
      </div>,
    },
    {
      path: "/Apps",
      element: <div className={`bg-${mode.bg}3 main`}>
        <Navbar mode={mode} toggle={toggle} />
        <AllApps mode={mode.bg} />
      </div>
    },
    {
      path: "/merge_pdf",
      element: <div className={`bg-${mode.bg}3 main`}>
        <Navbar mode={mode} toggle={toggle} />
        <PDFmerger mode={mode.bg} />
      </div>
    },
    {
      path: "/Auto-PDF-Rotater",
      element: <div className={`bg-${mode.bg}3 main`}>
        <Navbar mode={mode} toggle={toggle} />
        <PdfRotator mode={mode.bg} />
      </div>
    },
    {
      path: "/pdf_to_docx",
      element: <div className={`bg-${mode.bg}3 main`}>
        <Navbar mode={mode} toggle={toggle} />
        <PdftoDoc mode={mode.bg} />
      </div>
    },

  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
