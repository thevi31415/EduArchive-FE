import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Header from "./component/Header";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Document from "./pages/Document";
import Exam from "./pages/Exam";
import Project from "./pages/Project";
import Subject from "./pages/Subject";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/document" element={<Document />}></Route>
        <Route path="/exam" element={<Exam />}></Route>
        <Route path="/project" element={<Project />}></Route>
        <Route path="/subject" element={<Subject />}></Route>
      </Routes>
    </div>
  );
}

export default App;
