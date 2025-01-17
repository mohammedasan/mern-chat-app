// import React from 'react'
//import { Routes, Route } from 'react-router-dom';
// import { createRoot } from 'react-dom/client'; // Correct

// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// )
import React from "react";
import { createRoot } from "react-dom/client"; // Import `createRoot` from react-dom/client
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

const rootElement = document.getElementById("root"); // Ensure the `root` element exists in index.html
const root = createRoot(rootElement); // Use `createRoot`

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
