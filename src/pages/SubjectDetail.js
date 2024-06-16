import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import DocumentCard from "../component/DocumentCard";
import { ToastContainer, toast } from "react-toastify";
import ExamCard from "../component/ExamCard";
import ProjectCard from "../component/ProjectCard";
function SubjectDetail() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    // Fetch subject details
    fetch(`${API_BASE_URL}/api/Subject/ById/${subjectId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setSubject(data.data);
        } else {
          navigate("/notfound"); // Chuyển hướng đến trang NotFound nếu document là null
        }
      })
      .catch(() => {
        navigate("/notfound"); // Chuyển hướng đến trang NotFound nếu có lỗi
      });

    fetch(`${API_BASE_URL}/api/Document/search?idSubject=${subjectId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== true) {
          toast.error("Không thể tìm kiếm !");
        } else {
          setDocuments(data.data);
          toast.success("Tìm kiếm thành công !");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
    setLoading(false);
  }, [subjectId]);

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
  if (!subject) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader size={100} color={"#00F5A2"} loading={true} />
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
            <span className="hover:underline">
              <i className="fa-solid fa-book"></i> Môn học
            </span>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <span className="font-bold">{subject?.name}</span>
          </li>
        </ol>
      </nav>

      <div className="container mx-auto my-5 px-4">
        <div
          className=" rounded-2xl gradient-background"
          style={{ borderWidth: "1px" }}
        >
          <div className="relative">
            <img
              src={require("./images/bg_green.jpg")}
              alt="Cover"
              className="w-full h-40 object-cover rounded-t-2xl"
            />
            <div className="absolute top-24 w-full flex justify-center md:left-8 md:w-auto">
              <img
                src={subject?.avartar}
                alt="Profile"
                className=" rounded-lg object-cover border-4 border-white shadow-md"
                style={{ width: "120px", height: "120px" }}
              />
            </div>
          </div>
          <div
            className=" px-5 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center"
            style={{ marginTop: "55px" }}
          >
            <div className="flex flex-col text-center md:text-left">
              <h1
                className=" text-3xl"
                style={{ color: "#191919", fontWeight: "500" }}
              >
                {subject?.name}
              </h1>
              <p className="mt-2 text-xl  text-gray-800">{subject?.code}</p>
              <div className="flex justify-center md:justify-start mt-3 md:px-0">
                <button className=" bg-green-400  hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">
                  <i class="fa-solid fa-plus"></i> Theo dõi môn học
                </button>
              </div>
            </div>

            <div
              className="flex items-center space-x-6 mt-3 md:mt-0 text-gray-800"
              style={{ fontSize: "23px" }}
            >
              <div className="flex items-center space-x-1">
                <i className="fa-solid fa-file text-green-500"></i>
                <span className="font-bold">{subject?.document}</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="fa-solid fa-eye text-green-500"></i>
                <span className="font-bold">{subject?.view}</span>
              </div>
              <div className="flex items-center space-x-1">
                <i className="fa-solid fa-heart text-green-500"></i>
                <span className="font-bold">{subject?.like}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-6">
          {/* Cột bên trái */}
          <div className="col-span-2 space-y-6">
            {/* Mục Giới thiệu */}
            <div
              className="rounded-2xl gradient-background p-6"
              style={{ borderWidth: "1px" }}
            >
              <p className="text-gray-800 text-center md:text-left text-lg font-semibold mb-4">
                <i className="fa-solid fa-circle-info mr-2 text-green-500"></i>
                Giới thiệu
              </p>
              <p className="text-gray-800">{subject?.description}</p>
            </div>

            {/* Mục Tài liệu */}
            <div
              className="rounded-2xl gradient-background p-6"
              style={{ borderWidth: "1px" }}
            >
              <p className="text-gray-800 text-center md:text-left text-lg font-semibold mb-4">
                <i className="fa-solid fa-folder mr-2 text-green-500"></i>Tài
                liệu
              </p>
              {documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {documents
                    .filter((document) => document.typeDocument === "TaiLieu")
                    .map((document) => (
                      <div key={document.id}>
                        <Link to={`/document/${document.id}`}>
                          <DocumentCard document={document} />
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
                      Không tìm thấy tài liệu !
                    </p>
                    <p className="text-gray-600">
                      Xin lỗi, hiện tại chưa có tài liệu nào. Vui lòng quay trở
                      lại sau !
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Mục Đề thi */}
            <div
              className="rounded-2xl gradient-background  p-6"
              style={{ borderWidth: "1px" }}
            >
              <p className="text-gray-800 text-center md:text-left text-lg font-semibold mb-4">
                <i className="fa-solid fa-folder mr-2 text-green-500"></i>Đề thi
              </p>
              {documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {documents
                    .filter((document) => document.typeDocument === "DeThi")
                    .map((document) => (
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
                      Không tìm thấy tài liệu !
                    </p>
                    <p className="text-gray-600">
                      Xin lỗi, hiện tại chưa có tài liệu nào. Vui lòng quay trở
                      lại sau !
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Mục Đồ án */}
            <div
              className="rounded-2xl gradient-background  p-6"
              style={{ borderWidth: "1px" }}
            >
              <p className="text-gray-800 text-center md:text-left text-lg font-semibold mb-4">
                <i className="fa-solid fa-folder mr-2 text-green-500"></i>Đồ án
              </p>
              {documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                  {documents
                    .filter((document) => document.typeDocument === "DoAn")
                    .map((document) => (
                      <div key={document.id}>
                        <Link to={`/project/${document.id}`}>
                          <ProjectCard document={document} />
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
                      Không tìm thấy tài liệu !
                    </p>
                    <p className="text-gray-600">
                      Xin lỗi, hiện tại chưa có tài liệu nào. Vui lòng quay trở
                      lại sau !
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cột bên phải */}
          <div
            className="col-span-1 md:ml-6 md:mt-0 mt-6  rounded-2xl"
            style={{ borderWidth: "1px" }}
          >
            <div className="h-full  rounded-2xl p-6  items-center">
              {/* <div className="rounded-2xl gradient-background border-2 p-6">
                <p className="text-gray-800 text-center md:text-left text-lg font-semibold mb-4">
                  <i className="fa-solid fa-folder mr-2 text-green-500"></i>Đồ
                  án
                </p>
                <p className="text-gray-800">{subject?.description}</p>
              </div> */}
              <div className="relative flex-1 max-w-xl mt-4 sm:mt-0 w-full sm:w-auto flex justify-end">
                <div className="relative  max-w-xl" style={{ width: "100%" }}>
                  <input
                    placeholder="Tìm kiếm tài liệu..."
                    className="rounded-full w-full h-16 bg-transparent py-1 pl-8 pr-10 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-green-200 focus:border-green-200"
                    type="text"
                    name="query"
                    id="query"
                  />
                  <button
                    type="submit"
                    // onClick={handleSearch}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default SubjectDetail;
