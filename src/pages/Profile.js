import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import ExamCard from "../component/ExamCard";
import ProjectCard from "../component/ProjectCard";
import DocumentCard from "../component/DocumentCard";

function Profile() {
  const truncateName = (name) => {
    return name?.length > 17 ? name?.substring(0, 14) + "..." : name;
  };

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listFollowSubjects, setListFollowSubjects] = useState([]);
  const [listBookmark, setListBookmark] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const [listDocument, setListDocument] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const idGoogle = localStorage.getItem("idGoogle");
        const token = localStorage.getItem("token");

        if (!userId || !idGoogle || !token) {
          navigate("/login");
          return;
        }

        const userResponse = await fetch(
          `${API_BASE_URL}/api/User/${userId}/${idGoogle}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (!userResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await userResponse.json();
        setUser(userData.data);

        const followSubjectResponse = await fetch(
          `${API_BASE_URL}/api/FollowSubject/GetFollowSubjectByUserId?idUser=${userId}`
        );
        if (!followSubjectResponse.ok) {
          throw new Error("Failed to fetch follow subjects");
        }
        const followSubjectData = await followSubjectResponse.json();
        setListFollowSubjects(followSubjectData.data);

        const bookmarkResponse = await fetch(
          `${API_BASE_URL}/api/BookmarkDocument/GetBookmarkDocumentByUserId?idUser=${userId}`
        );
        if (!bookmarkResponse.ok) {
          throw new Error("Failed to fetch follow subjects");
        }
        const bookMarkData = await bookmarkResponse.json();
        setListBookmark(bookMarkData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Run once on component mount

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        let fetchedSubjects = [];
        for (let subjectId of listFollowSubjects) {
          const response = await fetch(
            `${API_BASE_URL}/api/Subject/ById/${subjectId.idSubject}`
          );
          const data = await response.json();

          if (data.status === true) {
            fetchedSubjects.push(data.data);
          } else {
            console.log(
              `Failed to retrieve subject for subjectId ${subjectId}`
            );
          }
        }
        setListSubject(fetchedSubjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    const fetchDocument = async () => {
      try {
        let fetchedDocument = [];
        for (let documentId of listBookmark) {
          const response = await fetch(
            `${API_BASE_URL}/api/Document/ById/${documentId.idDocument}`
          );
          const data = await response.json();

          if (data.status === true) {
            fetchedDocument.push(data.data);
          } else {
            console.log(
              `Failed to retrieve subject for subjectId ${documentId}`
            );
          }
        }
        setListDocument(fetchedDocument);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    if (listFollowSubjects.length > 0) {
      fetchSubjects();
    }
    if (listBookmark.length > 0) {
      fetchDocument();
    }
  }, [listFollowSubjects, listBookmark]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("idGoogle");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={100} color={"#48DA7D"} loading={loading} />
      </div>
    );
  }

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
            <a href="#" className="hover:underline">
              <i className="fa-solid fa-user"></i> Tài khoản
            </a>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <span className="font-bold">{user?.name}</span>
          </li>
        </ol>
      </nav>
      <div className="bg-white-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={user?.avartar}
                    className="w-32 h-32 rounded-full mb-4 border-4 border-green-400"
                  />
                  <h1 className="text-xl font-bold">{user?.name}</h1>
                  <p className="text-gray-700">@{user?.userName}</p>
                  <span className="mt-3 inline-block px-2 py-1 text-green-800 font-semibold bg-green-100 rounded-full">
                    {user?.email}
                  </span>

                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={handleLogout}
                      href="#"
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                    >
                      <i className="fa-solid fa-right-from-bracket"></i> Đăng
                      xuất
                    </button>
                    <a
                      href="#"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                    >
                      <i className="fa-solid fa-key"></i> Đổi mật khẩu
                    </a>
                  </div>
                </div>

                <div className="flex flex-col mt-3">
                  <ul className="m-2">
                    <li
                      className="mb-2"
                      style={{ fontSize: "19px", color: "#9CA3AF" }}
                    >
                      <i
                        className="fa-solid fa-location-dot"
                        style={{ marginRight: "10px", color: "#48DA7D" }}
                      ></i>
                      {user?.address ? user?.address : "Chưa có"}
                    </li>

                    <li
                      className="mb-2"
                      style={{ fontSize: "19px", color: "#9CA3AF" }}
                    >
                      <i
                        className="fa-solid fa-building"
                        style={{ marginRight: "10px", color: "#48DA7D" }}
                      ></i>
                      {user?.organization ? user?.organization : "Chưa có"}
                    </li>
                    <li
                      className="mb-2"
                      style={{ fontSize: "19px", color: "#9CA3AF" }}
                    >
                      <i
                        className="fa-solid fa-clock"
                        style={{ marginRight: "10px", color: "#48DA7D" }}
                      ></i>
                      {/* {formatDate(user?.createdDate)} */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6 mt-0">
                <div
                  className="flex items-center space-x-4"
                  style={{ color: "#3FDC85" }}
                >
                  <i className="fa-solid fa-user fa-xl"></i>
                  <h2 className="text-xl font-bold">Giới thiệu</h2>
                </div>
                <div className="mt-4">Content</div>
              </div>
              <div className="bg-white shadow rounded-lg p-6 mt-6">
                <div
                  className="flex items-center space-x-4"
                  style={{ color: "#3FDC85" }}
                >
                  <i className="fa-solid fa-chart-simple fa-xl"></i>
                  <h2 className="text-xl font-bold">Thống kê</h2>
                </div>
                <div className="bg-white  p-6 mt-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold mb-3"
                        style={{ color: "#3FDC85", fontSize: "28px" }}
                      >
                        {listSubject.length}
                      </div>
                      <div style={{ fontSize: "18px", color: "#A2A9B5" }}>
                        Theo dõi
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold mb-3"
                        style={{ color: "#3FDC85", fontSize: "28px" }}
                      >
                        {listDocument?.length}
                      </div>
                      <div style={{ fontSize: "18px", color: "#A2A9B5" }}>
                        Đã lưu
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold mb-3"
                        style={{ color: "#3FDC85", fontSize: "28px" }}
                      >
                        0
                      </div>
                      <div style={{ fontSize: "18px", color: "#A2A9B5" }}>
                        Lượt thích
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Tooltip id="my-tooltip" />

              <div className="bg-white shadow rounded-lg p-6 mt-6">
                <div
                  className="flex items-center space-x-4"
                  style={{ color: "#3FDC85" }}
                >
                  <i className="fa-solid fa-book fa-xl"></i>
                  <h2 className="text-xl font-bold">Môn học đã theo dõi</h2>
                </div>
                {/* {listDocument?.map((relatedDoc) => (
                  <div key={relatedDoc.id}>
                    {relatedDoc.typeDocument === "DeThi" ? (
                      <Link to={`/exam/${relatedDoc.id}`}>
                        <ExamCard document={relatedDoc} />
                      </Link>
                    ) : relatedDoc.typeDocument === "DoAn" ? (
                      <Link to={`/project/${relatedDoc.id}`}>
                        <ProjectCard document={relatedDoc} />
                      </Link>
                    ) : (
                      <Link to={`/document/${relatedDoc.id}`}>
                        <DocumentCard document={relatedDoc} />
                      </Link>
                    )}
                  </div>
                ))} */}

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                  {listSubject && listSubject.length > 0 ? (
                    listSubject.map((subject) => (
                      <a
                        key={subject.id}
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={
                          subject?.description.substring(0, 120) + "..."
                        }
                        data-tooltip-place="top"
                        className="block"
                      >
                        <div className="bg-white rounded-lg p-4 hover:bg-green-100 transition duration-300 ease-in-out shadow-md border border-[#dee0e2] hover:border-[#3FDC85]">
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
                              alt={subject.name}
                            />
                            <div>
                              <h2
                                className="text-lg font-semibold"
                                style={{
                                  color: "#3FDC85",
                                  fontSize: "1.4375rem",
                                  fontWeight: "450",
                                }}
                              >
                                {truncateName(subject.name)}
                              </h2>
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
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div
                        className="text-center text-gray-500"
                        style={{ fontSize: "20px" }}
                      >
                        Chưa theo dõi môn học nào !
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-6 mt-6">
                <div
                  className="flex items-center space-x-4"
                  style={{ color: "#3FDC85" }}
                >
                  <i className="fa-solid fa-bookmark fa-xl"></i>
                  <h2 className="text-xl font-bold">Tài liệu đã lưu</h2>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                  {listDocument && listDocument.length > 0 ? (
                    listDocument?.map((relatedDoc) => (
                      <div key={relatedDoc.id}>
                        {relatedDoc.typeDocument === "DeThi" ? (
                          <Link to={`/exam/${relatedDoc.id}`}>
                            <ExamCard document={relatedDoc} />
                          </Link>
                        ) : relatedDoc.typeDocument === "DoAn" ? (
                          <Link to={`/project/${relatedDoc.id}`}>
                            <ProjectCard document={relatedDoc} />
                          </Link>
                        ) : (
                          <Link to={`/document/${relatedDoc.id}`}>
                            <DocumentCard document={relatedDoc} />
                          </Link>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div
                        className="text-center text-gray-500"
                        style={{ fontSize: "20px" }}
                      >
                        Chưa lưu tài liệu nào !
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default Profile;
