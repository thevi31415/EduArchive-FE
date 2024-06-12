import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";
const Header = () => {
  const [users, setUser] = useState([]);
  const [token, setToken] = useState(null);
  const [show, setShow] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Chỉnh số 768 tùy vào kích thước màn hình bạn muốn coi là di động
    };

    handleResize(); // Kiểm tra kích thước màn hình ban đầu
    window.addEventListener("resize", handleResize); // Thêm event listener cho việc thay đổi kích thước màn hình

    return () => {
      window.removeEventListener("resize", handleResize); // Loại bỏ event listener khi component unmount
    };
  }, []);
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
    <div className="fixed shadow-md top-0 left-0 w-full z-10 bg-white border-b">
      <div className="  w-full flex justify-center items-start md:items-center box-border md:py-2 py-3 bg-[#E6F8F9] md:px-3 pl-3 pr-12 lg:relative top-0 z-[99999] lg:z-auto">
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
      <div className="py-4 md:py-2">
        <nav className="top-0 left-0 w-full z-10">
          <div>
            <div className="md:hidden flex flex-col items-center">
              <span
                className="font-medium text-lg text-brand-green "
                style={{
                  fontSize: "30px",
                  color: "#48DA7D",
                  fontWeight: "bold",
                  marginLeft: "10px",
                }}
              >
                <a href="/">EduArchive</a>{" "}
              </span>
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
                {!isMobile && (
                  <li className="p-3 mx-2">
                    <p className="relative group">
                      <div
                        className="flex justify-between items-center mb-2"
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                      >
                        <div className="text-left flex-grow">
                          <span
                            className="font-medium text-lg text-brand-green"
                            style={{
                              fontSize: "30px",
                              color: "#48DA7D",
                              fontWeight: "bold",
                              marginLeft: "10px",
                            }}
                          >
                            <a href="/">EduArchive</a>
                          </span>
                          <span
                            aria-hidden="true"
                            role="img"
                            className="text-lg ml-1"
                          >
                            ✨
                          </span>
                        </div>
                      </div>
                    </p>
                  </li>
                )}

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
                      <Link
                        to="/project"
                        className={getLinkClasses("/project")}
                      >
                        <i className="fa-solid fa-graduation-cap mr-2"></i> Đồ
                        án
                      </Link>
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-green-400 transition-all group-hover:w-full"></span>
                  </p>
                </li>
                <li className="p-3 mx-2">
                  <p className="relative group">
                    <span>
                      <Link
                        to="/subject"
                        className={getLinkClasses("/subject")}
                      >
                        <i className="fa-solid fa-book mr-2"></i> Môn học
                      </Link>
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-green-400 transition-all group-hover:w-full"></span>
                  </p>
                </li>
                {/* <li className="p-3 mx-2">
                  <p className="relative group">
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
                  </p>
                </li> */}

                <li className="p-3 mx-2 md:ml-auto">
                  {" "}
                  {/* This line has been modified */}
                  <p className="relative group">
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
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Header;
