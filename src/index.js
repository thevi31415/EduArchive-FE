import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Helmet } from "react-helmet";
const root = ReactDOM.createRoot(document.getElementById("root"));

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
