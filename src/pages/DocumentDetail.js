import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DocumentDetail() {
  const { documentId } = useParams();
  const [document, setDocument] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/Document/${documentId}`)
      .then((res) => res.json())
      .then((data) => setDocument(data.data));
  }, [documentId]);

  if (!document) {
    return <div>Loading...</div>;
  }
  const backgroundImageUrl =
    "https://res.cloudinary.com/dhs93uix6/image/upload/v1713968068/bg_gayfgp.jpg";

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${require("./images/6195955_3201891.jpg")})`,
          width: "100vw", // Cố định theo chiều rộng của viewport
          height: "100vh", // Cố định theo chiều cao của viewport
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="relative"
          style={{
            paddingTop: "30px",
            paddingBottom: "30px",
            paddingRight: "10vw", // Cố định khoảng cách bên phải của phần tử con
            paddingLeft: "10vw", // Cố định khoảng cách bên trái của phần tử con
          }}
        >
          <div className="p-6">
            <h1 className="text-4xl font-bold text-white mb-4">
              {document.title}
            </h1>
            <div className="text-white space-y-4">
              {/* Các phần nội dung ở đây */}
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
                height: "50vh", // Cố định chiều cao của ảnh
                width: "90vw", // Cố định chiều rộng của ảnh
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
            <p style={{ fontSize: "3vw", fontWeight: "bold" }}>Mô tả</p>{" "}
            {/* Sử dụng đơn vị phụ thuộc vào kích thước viewport */}
            <div style={{ marginTop: "3vh" }}>
              {" "}
              {/* Sử dụng đơn vị phụ thuộc vào kích thước viewport */}
              <p>{document.description}</p>
            </div>
          </div>
          <div style={{ marginTop: "5vh" }}>
            {" "}
            {/* Sử dụng đơn vị phụ thuộc vào kích thước viewport */}
            <p style={{ fontSize: "3vw", fontWeight: "bold" }}>Download</p>{" "}
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
