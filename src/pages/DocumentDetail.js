import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function DocumentDetail() {
  const { documentId } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm state để kiểm tra xem đang load hay không
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    setLoading(true); // Bắt đầu loading khi useEffect được gọi
    fetch(`${API_BASE_URL}/api/Document/${documentId}`)
      .then((res) => res.json())
      .then((data) => {
        setDocument(data.data);
        setLoading(false); // Kết thúc loading khi dữ liệu được load xong
      });
  }, [documentId]);

  if (loading) {
    // Nếu đang loading, hiển thị hiệu ứng xoay tròn
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader size={100} color={"#00F5A2"} loading={loading} />
      </div>
    );
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formattedDate = formatDate(document.createDate);
  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{document.title}</h1>
          <p className="text-gray-800">
            Tải lên bởi{" "}
            <span className="font-bold" style={{ color: "#02FBA3" }}>
              {document.nameAuthor}
            </span>{" "}
            vào <span className="font-bold">{formattedDate}</span>
          </p>
          <div className="border rounded-lg p-2 mt-3 ">
            <div className="flex items-center mb-4 mt-4">
              <i
                class="fa-solid fa-school fa-lg"
                style={{ marginRight: "12px" }}
              ></i>
              <p className="text-gray-800">{document.nameSchool}</p>
            </div>
            <div className="flex items-center mb-4 mt-4">
              <i
                class="fa-solid fa-book fa-lg"
                style={{ marginRight: "12px" }}
              ></i>
              <p className="text-gray-800">{document.nameSubject}</p>
            </div>
            <div className="flex items-center mb-4 mt-4">
              <i
                class="fa-solid fa-calendar-days fa-lg"
                style={{ marginRight: "12px" }}
              ></i>
              <p className="text-gray-800">{document.yearSchool}</p>
            </div>
            <div className="flex items-center mb-4 mt-4">
              <i
                class="fa-solid fa-eye fa-lg"
                style={{ marginRight: "12px" }}
              ></i>
              <p className="text-gray-800">{document.view}</p>
            </div>
          </div>

          <div style={{ width: "full", marginTop: "20px" }}>
            <img src={document.image} alt="Document" className="rounded-lg" />
          </div>
          <p className="text-gray-600 mb-4 mt-5">{document.description}</p>
          <div className="flex items-center justify-center mt-4">
            <a
              href={document.linkDownload}
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
              download
            >
              <span className="flex items-center">
                <i
                  class="fa-solid fa-download fa-lg"
                  style={{ marginRight: "10px" }}
                ></i>
                Download
              </span>
            </a>
          </div>
          <div
            id="alert-additional-content-3"
            className="p-4 mt-8 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium">
                Cảm ơn bạn đã download tài liệu của web !
              </h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
              Các tài liệu được sưu tầm từ nhiều nguồn khác nhau. Nếu có bất kỳ
              ý kiến nào vui lòng liên hệ theo thông tin bên dưới !
            </div>
            <div className="flex">
              <button
                type="button"
                className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <i
                  class="fa-solid fa-envelope fa-lg"
                  style={{ margin: "10px" }}
                ></i>
                nguyenduongthevi@gmail.com
              </button>
              {/* <button
                type="button"
                className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
                data-dismiss-target="#alert-additional-content-3"
                aria-label="Close"
              >
                Dismiss
              </button> */}
            </div>
          </div>
        </div>
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Related Documents</h2>
          {/* Render related documents here */}
          {/* For example: */}
          {/* {document.relatedDocuments.map((relatedDoc) => (
    <div key={relatedDoc.id} className="border p-4 mb-4">
      <h3 className="text-lg font-bold">{relatedDoc.title}</h3>
      <p className="text-gray-600">{relatedDoc.description}</p>
    </div>
    ))} */}
        </div>
      </div>
    </div>
  );
}

export default DocumentDetail;
