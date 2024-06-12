import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
const Header = () => {
  const [users, setUser] = useState([]);
  const [token, setToken] = useState(null);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "gradient-text flex items-center text-green-500 relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-green-400"
      : "gradient-text flex items-center group-hover:text-green-500 transition-colors";
  };
  useEffect(() => {
    const savedToken = localStorage.getItem("Token");
    const savedUser = localStorage.getItem("User");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    setToken(null);
    setUser(null);
  };
  useEffect(() => {
    const handleClick = () => {
      const menubtn = document.getElementById("menu-button");
      const menu = document.getElementById("menu");
      if (menubtn && menu) {
        menu.classList.toggle("hidden");
      }
    };

    const menubtn = document.getElementById("menu-button");
    if (menubtn) {
      menubtn.addEventListener("click", handleClick);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (menubtn) {
        menubtn.removeEventListener("click", handleClick);
      }
    };
  }, []);
  return (
    // <div className=" py-8 md:py-5 border-b border-gray-200 ">
    //   <div className="space-between mb-0 flex items-center xl:mb-6">
    //     <div class="inline-flex gap-1.5 text-sm mb-5">
    //       <span
    //         class="font-mediu"
    //         style={{ fontSize: "30px", color: "#00FBA3", fontWeight: "bold" }}
    //       >
    //         EduArchive
    //       </span>
    //       <span aria-hidden="true" role="img" style={{ fontSize: "30px" }}>
    //         ✨
    //       </span>
    //     </div>
    //   </div>
    //   <nav className="flex justify-between items-center px-4 py-2 bg-white">
    //     <div className="flex-grow flex justify-center">
    //       <ul className="flex space-x-4">
    //         <li className="relative group">
    //           <a
    //             href="/"
    //             className="text-gray-800 hover:text-black hover:underline transition duration-200 ease-in-out"
    //             style={{ fontWeight: "bold", fontSize: "17px" }}
    //           >
    //             Trang chủ
    //           </a>
    //         </li>
    //         <li className="relative group">
    //           <a
    //             href="/blog"
    //             className="text-gray-800 hover:text-black hover:underline transition duration-200 ease-in-out"
    //           >
    //             Bài viết
    //           </a>
    //         </li>
    //         <li className="relative group">
    //           <a
    //             href="/document"
    //             className="text-gray-800 hover:text-black hover:underline transition duration-200 ease-in-out"
    //           >
    //             Tài liệu
    //           </a>
    //         </li>
    //         <li className="relative group">
    //           <a
    //             href="/exam"
    //             className="text-gray-800 hover:text-black hover:underline transition duration-200 ease-in-out"
    //           >
    //             Đề thi
    //           </a>
    //         </li>
    //         <li className="relative group">
    //           <a
    //             href="/project"
    //             className="text-gray-800 hover:text-black hover:underline transition duration-200 ease-in-out"
    //           >
    //             Đồ án
    //           </a>
    //         </li>
    //         <li className="relative group">
    //           <a
    //             href="/subject"
    //             className="text-gray-800 hover:text-black hover:underline transition duration-200 ease-in-out"
    //           >
    //             Môn học
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="flex items-center">
    //       {token && users ? (
    //         <div>
    //           <span className="mr-4">Xin chào! {users.name}</span>
    //           <button
    //             onClick={handleLogout}
    //             className="text-gray-800 hover:text-black hover:underline transition duration-200 ease-in-out"
    //           >
    //             Đăng xuất
    //           </button>
    //         </div>
    //       ) : (
    //         <button className="text-black duration-200 ease-in-out hover:text-brand-green rounded-md shadow">
    //           <a
    //             href="/login"
    //             className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-400 hover:bg-green-600 md:py-2 md:text-lg md:px-5"
    //           >
    //             Đăng nhập
    //           </a>
    //         </button>
    //       )}
    //     </div>
    //   </nav>
    // </div>
    <div className="py-8 md:py-5 border-b border-gray-200">
      <div
        className="flex justify-between items-center mb-4"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <div className="text-left flex-grow">
          <span
            className="font-medium text-lg text-brand-green"
            style={{ fontSize: "30px", color: "#48DA7D", fontWeight: "bold" }}
          >
            EduArchive
          </span>
          <span aria-hidden="true" role="img" className="text-lg ml-1">
            ✨
          </span>
        </div>
        <div>
          {token && users ? (
            <div className="flex items-center">
              <span className="mr-4">Xin chào! {users.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-800 hover:text-black hover:underline transition duration-200 ease-in-out"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <button className="text-black duration-200 ease-in-out hover:text-brand-green rounded-md shadow">
              <a
                href="/login"
                className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-400 hover:bg-green-600 md:py-2 md:text-lg md:px-5"
              >
                Đăng nhập
              </a>
            </button>
          )}
        </div>
      </div>
      {/* <nav
        className="flex justify-between items-center  py-2 bg-white"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <ul className="flex space-x-4 flex-1">
          <li className="relative group">
            🏠
            <a
              href="/"
              className="text-black font-bold text-lg transition duration-200 ease-in-out"
            >
              Trang chủ
              <span className="absolute left-0 w-full h-0.5 bg-green-500 bottom-0 transition-transform duration-200 transform scale-x-0 group-hover:scale-x-100"></span>
            </a>
          </li>
          <li className="relative group">
            ✏️
            <a
              href="/blog"
              className="text-black font-bold text-lg transition duration-200 ease-in-out"
            >
              Bài viết
              <span className="absolute left-0 w-full h-0.5 bg-green-500 bottom-0 transition-transform duration-200 transform scale-x-0 group-hover:scale-x-100"></span>
            </a>
          </li>
          <li className="relative group">
            📃
            <a
              href="/document"
              className="text-black font-bold text-lg transition duration-200 ease-in-out"
            >
              Tài liệu
              <span className="absolute left-0 w-full h-0.5 bg-green-500 bottom-0 transition-transform duration-200 transform scale-x-0 group-hover:scale-x-100"></span>
            </a>
          </li>
          <li className="relative group">
            📝
            <a
              href="/exam"
              className="text-black font-bold text-lg transition duration-200 ease-in-out"
            >
              Đề thi
              <span className="absolute left-0 w-full h-0.5 bg-green-500 bottom-0 transition-transform duration-200 transform scale-x-0 group-hover:scale-x-100"></span>
            </a>
          </li>
          <li className="relative group">
            ⚒
            <a
              href="/project"
              className="text-black font-bold text-lg transition duration-200 ease-in-out"
            >
              Đồ án
              <span className="absolute left-0 w-full h-0.5 bg-green-500 bottom-0 transition-transform duration-200 transform scale-x-0 group-hover:scale-x-100"></span>
            </a>
          </li>
          <li className="relative group">
            🌎
            <a
              href="/subject"
              className="text-black font-bold text-lg transition duration-200 ease-in-out"
            >
              Môn học
              <span className="absolute left-0 w-full h-0.5 bg-green-500 bottom-0 transition-transform duration-200 transform scale-x-0 group-hover:scale-x-100"></span>
            </a>
          </li>
        </ul>
        <div></div>
      </nav> */}
      <nav className=" top-0 left-0 w-full z-10">
        <div>
          <div className="md:hidden">
            <div className="flex justify-center m-2">
              <div
                className="flex items-center p-1 px-3 border rounded-md cursor-pointer"
                id="menu-button"
              >
                <img
                  className="w-5 h-5 mr-2"
                  src={require("../pages/images/menu.png")}
                  alt="menu"
                  width={50}
                  height={50}
                />
                <div className="text-xl">Menu</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block" id="menu">
            <ul className="text-lg font-medium md:flex">
              <li className="p-3 mx-2">
                <p className="relative group">
                  <span>
                    <Link to="/" className={getLinkClasses("/")}>
                      <i className="fa-solid fa-house mr-2"></i> Trang chủ
                    </Link>
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-green-400 transition-all group-hover:w-full"></span>
                </p>
              </li>
              <li className="p-3 mx-2">
                <p className="relative group">
                  <span>
                    <Link
                      to="/document"
                      className={getLinkClasses("/document")}
                    >
                      <i className="fa-solid fa-folder mr-2"></i> Tài liệu
                    </Link>
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-green-400 transition-all group-hover:w-full"></span>
                </p>
              </li>
              <li className="p-3 mx-2">
                <p className="relative group">
                  <span>
                    <Link to="/exam" className={getLinkClasses("/exam")}>
                      <i className="fa-solid fa-file mr-2"></i> Đề thi
                    </Link>
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-green-400 transition-all group-hover:w-full"></span>
                </p>
              </li>
              <li className="p-3 mx-2">
                <p className="relative group">
                  <span>
                    <Link to="/project" className={getLinkClasses("/project")}>
                      <i className="fa-solid fa-graduation-cap mr-2"></i> Đồ án
                    </Link>
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-green-400 transition-all group-hover:w-full"></span>
                </p>
              </li>
              <li className="p-3 mx-2">
                <p className="relative group">
                  <span>
                    <Link to="/subject" className={getLinkClasses("/subject")}>
                      <i className="fa-solid fa-book mr-2"></i> Môn học
                    </Link>
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-green-400 transition-all group-hover:w-full"></span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
