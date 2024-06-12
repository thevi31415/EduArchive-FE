import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners"; // import ClipLoader từ react-spinners

function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/Subject`)
      .then((res) => res.json())
      .then((data) => {
        // Sắp xếp các môn học theo tên trước khi set vào state
        const sortedSubjects = data.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setSubjects(sortedSubjects);
        setLoading(false); // Khi dữ liệu đã được tải xong, đặt loading thành false
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
        setLoading(false); // Xử lý lỗi: đặt loading thành false
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Load thêm 4 phần tử mỗi lần nhấn
  };

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
            <span className="font-bold">
              <i className="fa-solid fa-book"></i> Môn học
            </span>
          </li>
        </ol>
      </nav>
      <section className="bg-white py-[10px] dark:bg-dark ml-5">
        <div className="px-4 sm:container">
          <div className="pl-5 border-l-4 border-green-500">
            <h2 className=" text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Môn học ({subjects?.length})
            </h2>
          </div>
        </div>
      </section>
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <div style={{ position: "relative" }}>
          {loading && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(255, 255, 255, 0.5)", // Màu mờ
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999, // Đảm bảo lớp mờ nằm phía trên
              }}
            >
              <ClipLoader color={"#60B557"} loading={loading} size={100} />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
            {subjects.slice(0, visibleCount).map((subject) => (
              <div
                key={subject.id}
                className="bg-white rounded-lg p-4 hover:bg-green-100 transition duration-300 ease-in-out"
                style={{
                  borderWidth: "0px",
                  margin: "10px",
                  padding: "20px",
                  borderColor: "#45D679",
                }}
              >
                <Link
                  to={`/subject/${subject.id}`}
                  className="flex items-center space-x-4"
                >
                  <i
                    className="fa-solid fa-book fa-2xl"
                    style={{ color: "#40D174" }}
                  ></i>
                  <div>
                    <h2
                      className="text-lg font-semibold"
                      style={{
                        color: "#40D174",
                        fontSize: "25px",
                        fontWeight: "500",
                      }}
                    >
                      {subject.name}
                    </h2>
                    <p style={{}}>{subject.code}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {visibleCount < subjects.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleLoadMore}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Subject;
