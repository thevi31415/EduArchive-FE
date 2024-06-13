import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import { ClipLoader } from "react-spinners";

function formatDate(date) {
  return format(new Date(date), "HH:mm:ss, dd/MM/yyyy");
}

function Profile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const idGoogle = localStorage.getItem("idGoogle");
    const token = localStorage.getItem("token");
    if (!userId || !idGoogle || !token) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE_URL}/api/User/${userId}/${idGoogle}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false); // Kết thúc loading dù thành công hay thất bại
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("idGoogle");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={100} color={"#48DA7D"} loading={loading} />
      </div>
    );
  }

  return (
    <>
      <nav
        className="flex p-4 ml-4 w-full mt-5"
        aria-label="Breadcrumb"
        style={{ marginTop: "20px" }}
      >
        <ol
          className="flex items-center space-x-4 text-green-500"
          style={{ fontSize: "20px" }}
        >
          <li>
            <a href="#" className="hover:underline">
              <i className="fa-solid fa-house "></i> Trang chủ
            </a>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <a href="#" className="hover:underline">
              <i className="fa-solid fa-user"></i> Tài khoản
            </a>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <span className="font-bold">{user?.name}</span>
          </li>
        </ol>
      </nav>
      <div className="bg-white-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={user.avartar}
                    className="w-32 h-32 rounded-full mb-4 border-4 border-green-400"
                  />
                  <h1 className="text-xl font-bold">{user.name}</h1>
                  <p className="text-gray-700">@{user.userName}</p>
                  <span className="mt-3 inline-block px-2 py-1 text-green-800 font-semibold bg-green-100 rounded-full">
                    {user.email}
                  </span>

                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={handleLogout}
                      href="#"
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    >
                      <i className="fa-solid fa-right-from-bracket"></i> Đăng
                      xuất
                    </button>
                    <a
                      href="#"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                    >
                      <i className="fa-solid fa-key"></i> Đổi mật khẩu
                    </a>
                  </div>
                </div>

                <div className="flex flex-col mt-3">
                  <ul className="m-2">
                    <li
                      className="mb-2"
                      style={{ fontSize: "19px", color: "#9CA3AF" }}
                    >
                      <i
                        className="fa-solid fa-location-dot"
                        style={{ marginRight: "10px", color: "#48DA7D" }}
                      ></i>
                      {user.address ? user.address : "Chưa có"}
                    </li>

                    <li
                      className="mb-2"
                      style={{ fontSize: "19px", color: "#9CA3AF" }}
                    >
                      <i
                        className="fa-solid fa-building"
                        style={{ marginRight: "10px", color: "#48DA7D" }}
                      ></i>
                      {user.organization ? user.organization : "Chưa có"}
                    </li>
                    <li
                      className="mb-2"
                      style={{ fontSize: "19px", color: "#9CA3AF" }}
                    >
                      <i
                        className="fa-solid fa-clock"
                        style={{ marginRight: "10px", color: "#48DA7D" }}
                      ></i>
                      {formatDate(user?.createdDate)}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "20px",
                  }}
                >
                  <button
                    onClick={openModal}
                    style={{
                      fontSize: "15px",
                      backgroundColor: "#48DA7D",
                      padding: "10px",
                      borderRadius: "10px",
                      color: "white",
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Chỉnh sửa
                  </button>
                </div>
                <h2 className="text-xl font-bold mb-4">Giới thiệu</h2>
                <p className="text-gray-700">{user.introduction}</p>

                <h2 className="text-xl font-bold mt-6 mb-4">Hoạt động</h2>
                <div className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold">
                      Web Developer
                    </span>
                    <p>
                      <span className="text-gray-700 mr-2">at ABC Company</span>
                      <span className="text-gray-700">2017 - 2019</span>
                    </p>
                  </div>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    finibus est vitae tortor ullamcorper, ut vestibulum velit
                    convallis. Aenean posuere risus non velit egestas suscipit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Profile;
