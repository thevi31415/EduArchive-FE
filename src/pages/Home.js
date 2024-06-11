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
              <div className="relative w-full max-w-xl mx-auto bg-white rounded-full m-3">
                <input
                  placeholder="e.g. Blog"
                  className="rounded-full w-full h-16 bg-transparent py-1 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200"
                  type="text"
                  name="query"
                  id="query"
                />
                <button
                  type="submit"
                  className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  style={{ backgroundColor: "#48DA7D" }}
                >
                  <svg
                    className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </button>
              </div>
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
      <section class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="rounded-2xl py-5 px-5 xl:py-16 xl:px-20 bg-gray-50 flex items-center justify-between flex-col gap-16 lg:flex-row">
            <div class="w-full lg:w-60">
              <h2 class="font-manrope text-4xl font-bold text-gray-900 mb-4 text-center lg:text-left">
                Tài nguyên
              </h2>
              <p class="text-sm text-gray-500 leading-6 text-center lg:text-left">
                Chúng tôi có đa dạng các tài nguyên khác nhau để các bạn tham
                khảo
              </p>
            </div>
            <div class="w-full lg:w-4/5">
              <div class="flex flex-col flex-1 gap-10 lg:gap-0 lg:flex-row lg:justify-between">
                <div class="block">
                  <div
                    class="font-manrope font-bold text-4xl  mb-3 text-center lg:text-left"
                    style={{ color: "#48DA7D" }}
                  >
                    260+
                  </div>
                  <span class="text-gray-900 text-center block lg:text-left">
                    Tài Liệu
                  </span>
                </div>
                <div class="block">
                  <div
                    class="font-manrope font-bold text-4xl mb-3 text-center lg:text-left"
                    style={{ color: "#48DA7D" }}
                  >
                    975+
                  </div>
                  <span class="text-gray-900 text-center block lg:text-left">
                    Đề thi
                  </span>
                </div>
                <div class="block">
                  <div
                    class="font-manrope font-bold text-4xl mb-3 text-center lg:text-left"
                    style={{ color: "#48DA7D" }}
                  >
                    724+
                  </div>
                  <span class="text-gray-900 text-center block lg:text-left">
                    Đồ án
                  </span>
                </div>
                <div class="block">
                  <div
                    class="font-manrope font-bold text-4xl mb-3 text-center lg:text-left"
                    style={{ color: "#48DA7D" }}
                  >
                    89+
                  </div>
                  <span class="text-gray-900 text-center block lg:text-left">
                    Môn Học
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
