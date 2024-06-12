import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function SubjectDetail() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [viewerUrl, setViewerUrl] = useState("");
  const getFileExtension = (url) => {
    return url.split(".").pop().toLowerCase();
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/Subject/ById/${subjectId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setSubject(data.data);
        } else {
          // navigate("/notfound"); // Chuyển hướng đến trang NotFound nếu document là null
        }
        setLoading(false);
      })
      .catch(() => {
        // navigate("/notfound"); // Chuyển hướng đến trang NotFound nếu có lỗi
      });
  }, [subjectId, API_BASE_URL, navigate]);
  if (loading) {
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
            <span className="hover:underline">
              <i className="fa-solid fa-book"></i> Môn học
            </span>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <span className="font-bold">{subject.name}</span>
          </li>
        </ol>
      </nav>

      <div className="container mx-auto m-5">
        <div
          style={{
            backgroundColor: "#effbdd",
            padding: "20px",
            borderRadius: "15px",
            paddingRight: "50px",
            paddingLeft: "90px",
          }}
        >
          <div>
            <div className="flex items-center space-x-4">
              <i
                className="fa-solid fa-book fa-5x"
                style={{ color: "#40D174", margin: "10px" }}
              ></i>
              <div>
                <p
                  className="text-lg font-semibold"
                  style={{
                    color: "#48DA7D",
                    fontSize: "30px",
                    fontWeight: "500",
                  }}
                >
                  {subject.name}
                </p>
                <p
                  style={{
                    marginTop: "10px",
                    color: "#323f48",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {subject.code}
                </p>
                <p className=" text-gray-800 text-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-green-500">
                      <i className="fa-solid fa-file"></i>
                      <span style={{ color: "#323f48", fontWeight: "bold" }}>
                        {subject.document}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-500">
                      <i className="fa-solid fa-eye"></i>
                      <span style={{ color: "#323f48", fontWeight: "bold" }}>
                        {subject.view}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-500">
                      <i className="fa-solid fa-heart"></i>
                      <span style={{ color: "#323f48", fontWeight: "bold" }}>
                        {subject.like}
                      </span>
                    </div>
                  </div>
                </p>
              </div>
            </div>
            <p style={{ marginTop: "10px", color: "#323f48" }}>
              {subject.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubjectDetail;
