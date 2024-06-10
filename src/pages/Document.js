import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners"; // import ClipLoader từ react-spinners
import DocumentCard from "../component/DocumentCard";

function Document() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/document/ByType/TaiLieu`)
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
      <nav
        className="flex rounded-lg bg-green-100 p-4 w-full"
        aria-label="Breadcrumb"
      >
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
            <span className="font-bold">Tài liệu</span>
          </li>
        </ol>
      </nav>
      <section className="bg-white py-[20px] dark:bg-dark ml-5">
        <div className="mx-auto px-4 sm:container">
          <div
            className="border-l-[5px] border-primary pl-5"
            style={{ color: "#22C55D" }}
          >
            <h2
              className="mb-2 text-3xl font-semibold text-dark dark:text-white"
              style={{ color: "#22C55D" }}
            >
              Tài liệu
            </h2>
          </div>
        </div>
      </section>
      <div style={{ margin: 20, marginLeft: 60, marginRight: 60 }}>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {documents.map((document) => (
              <div key={document.id}>
                <Link to={`/document/${document.id}`}>
                  {" "}
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

export default Document;
