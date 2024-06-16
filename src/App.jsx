import React, { useState } from 'react'
import './App.css'
import Navbar from '../components/Navbar'
import Home from '../components/Home';
import Greet from '../components/Greet';
import PdftoDoc from '../Tools/PdftoDoc';
import PdfRotator from '../Tools/PdfRotator';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AllApps from '../components/AllApps';

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


  const router = createBrowserRouter([
    {
      path: "/",
      element: <div className={`bg-${mode.bg}2 main`}>
        <Navbar mode={mode} toggle={toggle} />
        <Home mode={mode.bg === "dark" ? "light" : "dark"} />
      </div>,
    },
    {
      path: "/Apps",
      element: <div className={`bg-${mode.bg}2 main`}>
        <Navbar mode={mode} toggle={toggle} />
        <AllApps mode={mode.bg} />
      </div>
    },
    {
      path: "/Auto-PDF-Rotater",
      element: <div className={`bg-${mode.bg}2 main`}>
        <Navbar mode={mode} toggle={toggle} />
        <PdfRotator mode={mode.bg} />
      </div>
    },
    {
      path: "/PdftoDoc",
      element: <div className={`bg-${mode.bg}2 main`}>
        <Navbar mode={mode} toggle={toggle} />
        <PdftoDoc />
      </div>
    },
    {
      path: "/Greet/:Name",
      element: <Greet />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
