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
import UserDetail from "./pages/UserDetail";
import DocumentDetail from "./pages/DocumentDetail";
import ExamDetail from "./pages/ExamDetail";

function App() {
  return (
    <body className="max-w-screen font-sans leading-normal text-black lg:text-base ">
      <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <div
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          />
        </div>
        <div
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-gray-900">
            <strong className="font-semibold">Thông báo </strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
            Trang web đang trong quá trình phát triển.
          </p>
        </div>
        <div className="flex flex-1 justify-end">
          <button
            type="button"
            className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          >
            <span className="sr-only">Dismiss</span>
          </button>
        </div>
      </div>
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <header className="mx-auto flex max-w-8xl flex-col px-5">
          <Header />
        </header>
        <main className="relative mx-auto max-w-8xl px-15  lg:flex-wrap lg:gap-x-8 lg:ml-70 lg:mr-70">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/document" element={<Document />}></Route>
            <Route path="/exam" element={<Exam />}></Route>
            <Route path="/project" element={<Project />}></Route>
            <Route path="/subject" element={<Subject />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/user/:userId" element={<UserDetail />} />
            <Route path="/document/:documentId" element={<DocumentDetail />} />
            <Route path="/exam/:examId" element={<ExamDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </body>
  );
}

export default App;
