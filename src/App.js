import logo from "./logo.svg";
import { Routes, Route, Link, useLocation } from "react-router-dom";
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
import UserDetail from "./pages/Profile";
import DocumentDetail from "./pages/DocumentDetail";
import ExamDetail from "./pages/ExamDetail";
import NotFound from "./pages/NotFound";
import SubjectDetail from "./pages/SubjectDetail";
import Profile from "./pages/Profile";

function App() {
  const location = useLocation();

  return (
    <div className="max-w-screen font-sans leading-normal text-black lg:text-base">
      <div className="w-full flex justify-center items-start md:items-center box-border md:py-2 py-3 bg-[#E6F8F9] md:px-3 pl-3 pr-12 lg:relative top-0 z-[99999] lg:z-auto">
        <div className="relative my-auto mr-3 mt-0 md:m-0 md:mr-1">
          <span style={{ fontSize: "25px", margin: "5px" }}>🎉</span>
        </div>
        <div>
          <span className="my-auto text-[#414045] font-medium text-14 mr-1">
            Trang web đang trong quá trình phát triển !
          </span>
        </div>
        <button className="absolute md:right-6 right-4 md:top-[15px] top-4">
          <i className="svicon-close text-2xl font-bold"></i>
        </button>
      </div>
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {location.pathname !== "/login" && (
          <header className="mx-auto flex max-w-8xl flex-col">
            <Header />
          </header>
        )}
        <main
          className="relative mx-auto max-w-8xl px-15 lg:flex-wrap lg:gap-x-8 lg:ml-70 lg:mr-70"
          style={location.pathname !== "/login" ? { marginTop: "100px" } : {}}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/document" element={<Document />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/project" element={<Project />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/document/:documentId" element={<DocumentDetail />} />
            <Route path="/exam/:examId" element={<ExamDetail />} />
            <Route path="/subject/:subjectId" element={<SubjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {location.pathname !== "/login" && <Footer />}
      </div>
    </div>
  );
}
export default App;
