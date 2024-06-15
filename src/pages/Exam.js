import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners"; // import ClipLoader từ react-spinners
// import DocumentCard from "../component/DocumentCard";
import { ToastContainer, toast } from "react-toastify";

import ExamCard from "../component/ExamCard";
function Exam() {
  const [documents, setDocuments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (searchText.trim() === "") {
      // Nếu không có searchText thì load lại danh sách đồ án theo loại
      fetch(`${API_BASE_URL}/api/document/ByType/DeThi`)
        .then((res) => res.json())
        .then((data) => {
          setDocuments(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching documents:", error);
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch(
        `${API_BASE_URL}/api/Document/search?searchText=${searchText}&searchType=DeThi`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== true) {
            toast.error("Không thể tìm kiếm !");
          } else {
            setDocuments(data.data);
            setLoading(false);
            toast.success("Tìm kiếm thành công !");
          }
        })
        .catch((error) => {
          toast.error(error);
          setLoading(false);
        });
    }
  }, [searchText]);
  const handleSearch = () => {
    // Gọi hàm tìm kiếm khi click vào nút Search
    setSearchText(document.getElementById("query").value);
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
              <i className="fa-solid fa-file"></i> Đề thi
            </span>
          </li>
        </ol>
      </nav>
      <section className="bg-white py-[10px] dark:bg-dark ml-5">
        <div className="px-4 sm:container flex flex-col sm:flex-row items-center justify-between">
          <div className="w-full sm:w-auto flex justify-start sm:justify-start">
            <div className="pl-5 border-l-4 border-green-500">
              <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                Đề thi ({documents?.length})
              </h2>
            </div>
          </div>
          <div className="relative flex-1 max-w-xl mt-4 sm:mt-0 w-full sm:w-auto flex justify-end">
            <div className="relative  max-w-xl" style={{ width: "100%" }}>
              <input
                placeholder="Tìm kiếm đề thi..."
                className="rounded-full w-full h-16 bg-transparent py-1 pl-8 pr-10 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-green-200 focus:border-green-200"
                type="text"
                name="query"
                id="query"
              />
              <button
                type="submit"
                onClick={handleSearch}
                className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-green-400 sm:px-6 sm:text-base sm:font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
            {documents?.map((document) => (
              <div key={document.id}>
                <Link to={`/exam/${document.id}`}>
                  <ExamCard document={document} />
                </Link>
              </div>
            ))}
          </div> */}
          {documents?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
              {documents.map((document) => (
                <div key={document.id}>
                  <Link to={`/exam/${document.id}`}>
                    <ExamCard document={document} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="flex items-center justify-center "
              style={{ margin: "20px" }}
            >
              <div className="text-center">
                <p
                  className="text-lg font-bold mb-2"
                  style={{ fontSize: "30px", color: "#70DE92" }}
                >
                  Không tìm thấy đề thi !
                </p>
                <p className="text-gray-600">
                  Xin lỗi, hiện tại chưa có đồ án nào. Vui lòng quay trở lại sau
                  !
                </p>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
export default Exam;
