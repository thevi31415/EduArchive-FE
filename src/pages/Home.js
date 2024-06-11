import Slider from "../component/Slider";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [users, setUser] = useState([]);
  const [token, setToken] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [users2, setUser2] = useState(null);

  useEffect(() => {
    // Retrieve the token from session storage
    const storedToken = localStorage.getItem("Token");
    const user = localStorage.getItem("User");

    setToken(storedToken);
    setUser2(JSON.parse(user));
    const fetchUsers = async (authToken) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUser(data.data);
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    // Only fetch users if token is available
    if (storedToken) {
      fetchUsers(storedToken);
    }
  }, []); // Only re-run the effect if API_BASE_URL changes

  return (
    <>
      <div className=" bg-white lg:pb-4">
        <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2
                className="text-2xl font-bold md:text-3xl"
                style={{ color: "#48DA7D" }}
              >
                EduArchive
              </h2>

              <p className=" text-gray-500 md:mt-4 md:block">
                Chào mừng các bạn đến với trang web chia sẻ tài liệu học tập, đồ
                án, và đề thi. Tôi đã cẩn thận thu thập nhiều tài liệu quý giá
                trong quá trình học tập của mình, hy vọng sẽ giúp các bạn nắm
                vững kiến thức và đạt kết quả cao. Chúc các bạn học tập hiệu quả
                và thành công!
              </p>

              <div className="mt-4 md:mt-8">
                <a
                  href="#"
                  className="inline-block rounded px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                  style={{ backgroundColor: "#48DA7D" }}
                >
                  Bắt đầu khám phá
                </a>
              </div>
            </div>
          </div>

          <img
            alt=""
            src="https://res.cloudinary.com/dhs93uix6/image/upload/v1718114484/2151164310_ixtlqs.jpg"
            className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-ss-[30px] md:h-[calc(100%_-_4rem)] md:rounded-ss-[60px]"
          />
        </section>
      </div>
      {/* <div>
      <h1 className="text-3xl font-bold underline bg-gray-50">Trang chủ</h1>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/user/${user.userName}`}>{user.userName}</Link>
        </div>
      ))}
      <div>
        <h2>User Profile upate: {token}</h2>
        <h1>{users2?.name}</h1>
      </div>
    </div> */}
    </>
  );
}

export default Home;
