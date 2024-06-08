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
import Login from "./pages/Login";
import Footer from "./component/Footer";
import Blog from "./pages/Blog";
function App() {
  return (
    <body
      className="max-w-screen font-sans leading-normal text-black lg:text-base "
      style={{ marginLeft: 20, marginRight: 20 }}
    >
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <header className="mx-auto flex max-w-8xl flex-col px-4">
          <Header />
        </header>
        <section className="relative mx-auto w-full max-w-8xl">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/blog" element={<Blog />}></Route>

            <Route path="/document" element={<Document />}></Route>
            <Route path="/exam" element={<Exam />}></Route>
            <Route path="/project" element={<Project />}></Route>
            <Route path="/subject" element={<Subject />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </section>
        <Footer />
      </div>
    </body>
  );
}

export default App;
