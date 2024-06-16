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
          navigate("/notfound");
        }
      })
      .catch(() => {
        navigate("/notfound");
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

  return (
    <>
      <div className="container mx-auto my-5 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-6">
          <div className="col-span-2 space-y-6">
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
        </div>
      </div>
    </>
  );
}

export default SubjectDetail;
