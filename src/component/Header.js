import React, { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className=" py-8 md:py-10">
      <div className="space-between mb-0 flex items-center xl:mb-6">
        {/* <Link
          className="block min-w-[200px] max-w-[318px] grow"
          data-ga-click=""
          data-ga-element="nav-logo"
          data-ga-action="nav-logo"
          data-ga-item="logo"
          href="https://lifehacker.com"
        >
          <img
            src="https://lifehacker.com/images/lifehacker-logo.svg"
            alt="Lifehacker Logo"
            width="318"
            height="100"
          />
        </Link> */}

        <div class="inline-flex gap-1.5 text-sm mb-5">
          <span class="font-medium text-gray-900" style={{ fontSize: "30px" }}>
            EduArchive
          </span>
          <span aria-hidden="true" role="img" style={{ fontSize: "30px" }}>
            ✨
          </span>
        </div>
        <div className="flex w-full items-center justify-end ">
          <ul className="hidden items-center gap-x-4  pr-4 sm:flex">
            <li>
              <i
                class="fa-brands fa-facebook fa-2xl"
                style={{ color: "#1973EB" }}
              ></i>
            </li>
            <li>
              <i
                class="fa-brands fa-youtube fa-2xl"
                style={{ color: "#FF0000" }}
              ></i>
            </li>
            <li>
              <i
                class="fa-brands fa-github fa-2xl"
                style={{ color: "#1F2329" }}
              ></i>
            </li>
            <li>
              <i
                class="fa-brands fa-twitter fa-2xl"
                style={{ color: "#45A4E1" }}
              ></i>
            </li>
          </ul>
        </div>
      </div>
      <nav className="flex justify-between items-center ">
        <ul className="flex space-x-4">
          <li className="relative group">
            <a href="/" className="text-gray-800 hover:text-brand-green">
              Trang chủ
            </a>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
          </li>
          <li className="relative group">
            <a
              href="/document"
              className="text-gray-800 hover:text-brand-green"
            >
              Tài liệu
            </a>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
          </li>
          <li className="relative group">
            <a href="/exam" className="text-gray-800 hover:text-brand-green">
              Đề thi
            </a>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
          </li>
          <li className="relative group">
            <a href="/project" className="text-gray-800 hover:text-brand-green">
              Đồ án
            </a>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
          </li>
          <li className="relative group">
            <a href="/subject" className="text-gray-800 hover:text-brand-green">
              Môn học
            </a>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
          </li>
          <li className="relative group">
            <a href="/login" className="text-gray-800 hover:text-brand-green">
              Đăng nhập
            </a>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
          </li>
        </ul>
        <button className="text-black duration-200 ease-in-out hover:text-brand-green">
          <h1>Xin chào! Nguyễn Dương Thế Vĩ</h1>
        </button>
      </nav>
    </div>
  );
};
export default Header;
