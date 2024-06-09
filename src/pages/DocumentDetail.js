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
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${require("./images/6195955_3201891.jpg")})`,
          width: "100vw",
          height: "40vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          backgroundSize: "cover",
        }}
      >
        <div
          className="relative"
          style={{
            paddingTop: "30px",
            paddingBottom: "30px",
            paddingRight: "10vw", // Cố định khoảng cách bên phải của phần tử con
            paddingLeft: "8vw", // Cố định khoảng cách bên trái của phần tử con
          }}
        >
          <div
            className="p-9"
            style={{ marginTop: "30px", marginBottom: "30px" }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              {document.title}
            </h1>
            <div className="text-white space-y-2">
              <div className="flex items-center">
                <div className="flex items-center mr-11">
                  <i className="fa-solid fa-user fa-xl mr-5"></i>
                  <p className="text-lg ">{document.nameAuthor}</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-school fa-xl mr-3"></i>
                <p className="text-lg">{document.nameSchool}</p>
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-book fa-xl mr-2"></i>
                <p className="text-lg">{document.nameSubject}</p>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <i className="fa-solid fa-calendar-days fa-xl mr-2"></i>
                  <p className="text-lg">{document.yearSchool}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-20">
                  <i className="fa-solid fa-eye fa-xl mr-2"></i>
                  <p className="text-lg">{document.view}</p>
                </div>
                <div className="flex items-center">
                  <i className="fa-solid fa-clock fa-xl mr-2"></i>
                  <p className="text-lg">
                    {(() => {
                      const createDate = new Date(document.createDate);
                      const day = createDate.getDate();
                      const month = createDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
                      const year = createDate.getFullYear();
                      return `${day}/${month}/${year}`;
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative"
        style={{
          marginLeft: "10vw", // Cố định khoảng cách bên trái của phần tử con
          marginRight: "10vw", // Cố định khoảng cách bên phải của phần tử con
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ paddingTop: "20px" }}>
            <img
              style={{
                height: "70vh", // Cố định chiều cao của ảnh
                width: "95vw", // Cố định chiều rộng của ảnh
                borderRadius: "10px",
              }}
              src={document.image}
              alt="image"
            />
          </div>
        </div>
        <div
          className="relative z-10 bg-white"
          style={{ padding: "2vh", marginTop: "5vh" }} // Sử dụng đơn vị phụ thuộc vào kích thước viewport
        >
          <div>
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>Mô tả</p>{" "}
            <div style={{ marginTop: "3vh" }}>
              {" "}
              <p>{document.description}</p>
            </div>
          </div>
          <div style={{ marginTop: "5vh" }}>
            {" "}
            {/* Sử dụng đơn vị phụ thuộc vào kích thước viewport */}
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>
              Download
            </p>{" "}
            {/* Sử dụng đơn vị phụ thuộc vào kích thước viewport */}
            <div style={{ marginTop: "3vh" }}>
              {" "}
              {/* Sử dụng đơn vị phụ thuộc vào kích thước viewport */}
              <div className="flex items-center justify-center">
                <p className="font-bold">
                  <a
                    href={document.linkDownload}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out transform hover:scale-105"
                    download
                  >
                    <i
                      className="fa-solid fa-download fa-2xl"
                      style={{ color: "white", marginRight: "10px" }}
                    ></i>
                    <span style={{ fontSize: "2vw" }}>Download</span>{" "}
                    {/* Sử dụng đơn vị phụ thuộc vào kích thước viewport */}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentDetail;
