import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import RelatedDocuments from "../component/RelatedDocuments";

import { ToastContainer, toast } from "react-toastify";
import DocumentBody from "./DocumentBody";

import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share";
function ProjectDetail() {
  const currentUrl = window.location.href;

  const { projectId } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [listDocuments, setListDocuments] = useState([]);

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const copyToClipboard = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Sao chép đường link thành công !");
      })
      .catch((err) => {
        toast.error("Không thể sao chép đường link !");
      });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  useEffect(() => {
    setLoading(true);

    fetch(`${API_BASE_URL}/api/Document/ById/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setDocument(data.data);
      });

    fetch(`${API_BASE_URL}/api/Document/ByIdSubject/${document?.idSubject}`)
      .then((res) => res.json())
      .then((data) => {
        setListDocuments(data.data);
      });

    fetch(`${API_BASE_URL}/api/Subject/ById/${document?.idSubject}`)
      .then((res) => res.json())
      .then((data) => {
        setSubject(data.data);
      });
    setLoading(false);
  }, [projectId, document]);
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

  const formattedDate = formatDate(document?.createDate);
  if (!document) {
    return <h1>Error 404: Document not found</h1>;
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
              <i className="fa-solid fa-graduation-cap"></i> Đồ án
            </span>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <span className="font-bold">{document?.title}</span>
          </li>
        </ol>
      </nav>

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1
              className="text-4xl  mb-4"
              style={{ fontWeight: "600", color: "#0A0A0A" }}
            >
              💡{document?.title}
            </h1>
            <p
              className="text-gray-800"
              style={{ color: "#7A838C", fontSize: "17px" }}
            >
              Tải lên bởi{" "}
              <span className="font-bold" style={{ color: "#48DA7D" }}>
                {document?.nameAuthor}
              </span>{" "}
              vào <span>{formattedDate}</span>
            </p>
            <div className="flex flex-col md:flex-row justify-between mt-3 mb-3">
              <div className="flex justify-center space-x-2 mb-3 md:mb-0">
                <FacebookShareButton
                  url={currentUrl}
                  quote={"EduArchive"}
                  hashtag="#EduArchive"
                  className="text-center"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={currentUrl}
                  quote={"EduArchive"}
                  hashtag="#EduArchive"
                  className="text-center"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <TelegramShareButton
                  url={currentUrl}
                  quote={"EduArchive"}
                  hashtag="#EduArchive"
                  className="text-center"
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
                <EmailShareButton
                  url={currentUrl}
                  quote={"EduArchive"}
                  hashtag="#EduArchive"
                  className="text-center"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
              <div
                className="flex justify-center space-x-2"
                style={{ color: "#48DA7D" }}
              >
                <button
                  onClick={copyToClipboard}
                  className="font-bold py-2 px-3"
                  style={{ fontSize: "26px" }}
                >
                  <i className="fa-solid fa-copy"></i>
                </button>
                <button
                  className="font-bold py-2 px-3"
                  style={{ fontSize: "26px" }}
                >
                  <i className="fa-solid fa-bookmark"></i>
                </button>
                <button
                  className="font-bold py-2 px-3"
                  style={{ fontSize: "26px" }}
                >
                  <i className="fa-solid fa-heart"></i> 0
                </button>
              </div>
            </div>

            <DocumentBody document={document} />

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
                Các tài liệu được sưu tầm từ nhiều nguồn khác nhau. Nếu có bất
                kỳ ý kiến nào vui lòng liên hệ theo thông tin bên dưới !
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
              </div>
            </div>
          </div>
          <RelatedDocuments
            subject={subject}
            listDocuments={listDocuments}
            documentId={projectId}
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ProjectDetail;
