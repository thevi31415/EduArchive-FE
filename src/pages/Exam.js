import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners"; // import ClipLoader từ react-spinners
import DocumentCard from "../component/DocumentCard";
function Exam() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/document/ByType/DeThi`)
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data.data);
        setLoading(false); // Khi dữ liệu đã được tải xong, đặt loading thành false
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
        setLoading(false); // Xử lý lỗi: đặt loading thành false
      });
  }, []);

  return (
    <>
      <nav className="flex  bg-green-100 p-4 w-full" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4 text-green-500">
          <li>
            <a href="#" className="hover:underline">
              Trang chủ
            </a>
          </li>
          <li>
            <span>/</span>
          </li>

          <li>
            <span className="font-bold">Đề thi</span>
          </li>
        </ol>
      </nav>
      <section className="bg-white py-[10px] dark:bg-dark ml-5">
        <div className="px-4 sm:container">
          <div className="pl-5 border-l-4 border-green-500">
            <h2 className=" text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Đề thi ({documents?.length})
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
            {documents.map((document) => (
              <div key={document.id}>
                <Link to={`/exam/${document.id}`}>
                  <DocumentCard document={document} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Exam;
