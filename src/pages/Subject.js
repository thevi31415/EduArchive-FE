import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners"; // import ClipLoader từ react-spinners
import { Tooltip } from "react-tooltip";
function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const truncateName = (name) => {
    return name.length > 17 ? name.substring(0, 14) + "..." : name;
  };

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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1 px-4">
            {subjects.slice(0, visibleCount).map((subject) => (
              <a
                data-tooltip-id="my-tooltip"
                data-tooltip-content={
                  subject.description.substring(0, 120) + "..."
                }
                data-tooltip-place="top"
              >
                <div
                  key={subject.id}
                  className="bg-white rounded-lg p-4 hover:bg-green-100 transition duration-300 ease-in-out shadow-md border border-[#dee0e2] hover:border-[#3FDC85]"
                  style={{
                    margin: "10px",
                    padding: "20px",
                  }}
                >
                  <Link
                    to={`/subject/${subject.id}`}
                    className="flex items-center space-x-4"
                  >
                    <img
                      src={subject.avartar}
                      className="rounded-lg object-cover border-4 border-white shadow-md"
                      style={{
                        width: "70px",
                        height: "70px",
                      }}
                    />
                    <div>
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={subject.name}
                        data-tooltip-place="top"
                      >
                        <h2
                          className="text-lg font-semibold"
                          style={{
                            color: "#3FDC85",
                            fontSize: "23px",
                            fontWeight: "450",
                          }}
                        >
                          {truncateName(subject.name)}
                        </h2>
                      </a>

                      <p
                        style={{
                          marginTop: "5px",
                          color: "#747A82",
                          fontWeight: "400",
                        }}
                      >
                        {subject.code}
                      </p>
                    </div>
                  </Link>
                </div>
              </a>
            ))}
          </div>
          <Tooltip id="my-tooltip" />
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
