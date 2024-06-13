import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import { ClipLoader } from "react-spinners";
function formatDate(date) {
  return format(new Date(date), "HH:mm:ss, dd/MM/yyyy");
}

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={100} color={"#48DA7D"} loading={loading} />
      </div>
    );
  }

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

  return (
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
                <span className="mt-3 inline-block px-2 py-1 font-semibold text-white bg-green-500 rounded-full">
                  {user.email}
                </span>

                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleLogout}
                    href="#"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  >
                    <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
                  </button>
                  <a
                    href="#"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                  >
                    <i class="fa-solid fa-key"></i> Đổi mật khẩu
                  </a>
                </div>
              </div>

              <div className="flex flex-col mt-3">
                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2 mt-4">
                  Hoạt động:
                </span>
                <ul>
                  <li className="mb-2">
                    Ngày tham gia: {formatDate(user?.createdDate)}
                  </li>
                  <li className="mb-2">
                    Truy cập: {formatDate(user?.lastVisit)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Trường học</h2>
              <p className="text-gray-700">{user.organization}</p>
              <h2 className="text-xl font-bold mb-4">Địa chỉ</h2>
              <p className="text-gray-700">{user.address}</p>

              <h2 className="text-xl font-bold mb-4">Giới thiệu</h2>
              <p className="text-gray-700">{user.introduction}</p>

              <h2 className="text-xl font-bold mt-6 mb-4">Hoạt động</h2>
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-gray-700 font-bold">Web Developer</span>
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
  );
}

export default Profile;
