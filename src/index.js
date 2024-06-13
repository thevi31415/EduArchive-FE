import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const root = ReactDOM.createRoot(document.getElementById("root"));
const API_BASE_URL = process.env.ID_GOOGLE_API;

root.render(
  <GoogleOAuthProvider clientId="780332756678-s91uf0kq1och63944jrd88vii16nmusq.apps.googleusercontent.com">
    <React.StrictMode>
      <Helmet>
        <title>EduArchive</title>
      </Helmet>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();
