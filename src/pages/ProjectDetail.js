import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import GoogleDriveViewer from "../component/GoogleDriveViewer";
import GoogleDriveDownloader from "./GoogleDriveDownloader";
import { ToastContainer, toast } from "react-toastify";

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
  const googleDriveUrl =
    "https://drive.google.com/file/d/14nR6-rGZFeXvn8Hrq44BiCn6YhXqa5Xd/view";
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [viewerUrl, setViewerUrl] = useState("");
  const getFileExtension = (url) => {
    return url.split(".").pop().toLowerCase();
  };
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

  //   setLoading(true); // Bắt đầu loading khi useEffect được gọi
  //   fetch(`${API_BASE_URL}/api/Document/ById/${examId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDocument(data.data);
  //       const linkDownload = data.data.linkDownload;
  //       const fileExtension = linkDownload.split(".").pop().toLowerCase();
  //       if (fileExtension === "pdf") {
  //         setViewerUrl(linkDownload);
  //       } else if (fileExtension === "docx" || fileExtension === "doc") {
  //         setViewerUrl(
  //           `https://docs.google.com/gview?url=${encodeURIComponent(
  //             linkDownload
  //           )}&embedded=true`
  //         );
  //       } else {
  //         console.error("Unsupported file type");
  //       }
  //       setLoading(false); // Kết thúc loading khi dữ liệu được load xong
  //     });
  // }, [examId]);
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/Document/ById/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setDocument(data.data);
          const linkDownload = data.data.linkDownload;
          const fileExtension = linkDownload.split(".").pop().toLowerCase();
          if (fileExtension === "pdf") {
            setViewerUrl(linkDownload);
          } else if (fileExtension === "docx" || fileExtension === "doc") {
            setViewerUrl(
              `https://docs.google.com/gview?url=${encodeURIComponent(
                linkDownload
              )}&embedded=true`
            );
          } else {
            console.error("Unsupported file type");
          }
        } else {
          navigate("/notfound"); // Chuyển hướng đến trang NotFound nếu document là null
        }
        setLoading(false);
      })
      .catch(() => {
        navigate("/notfound"); // Chuyển hướng đến trang NotFound nếu có lỗi
      });
  }, [projectId, API_BASE_URL, navigate]);
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
              <i className="fa-solid fa-graduation-cap"></i> Đồ án
            </span>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <span className="font-bold">{document.title}</span>
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
              💡{document.title}
            </h1>
            <p
              className="text-gray-800"
              style={{ color: "#7A838C", fontSize: "17px" }}
            >
              Tải lên bởi{" "}
              <span className="font-bold" style={{ color: "#48DA7D" }}>
                {document.nameAuthor}
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

            <div className=" mt-2">
              <div className="flex items-center space-x-8">
                <div className="flex items-center">
                  <i
                    className="fa-solid fa-school fa-lg  mr-2"
                    style={{ color: "#2F3E4E" }}
                  ></i>
                  <a
                    href="#"
                    className="text-lg font-semibold relative hover:underline"
                    style={{ color: "#48DA7D" }}
                  >
                    {document.nameSchool}
                  </a>
                </div>
                <div className="flex items-center">
                  <i
                    className="fa-solid fa-book fa-lg  mr-2"
                    style={{ color: "#2F3E4E" }}
                  ></i>
                  <a
                    href="#"
                    className="text-lg font-semibold relative hover:underline"
                    style={{ color: "#48DA7D" }}
                  >
                    {document.nameSubject}
                  </a>
                </div>
                <div className="flex items-center">
                  <i
                    className="fa-solid fa-calendar-days fa-lg  mr-2"
                    style={{ color: "#2F3E4E" }}
                  ></i>
                  <a
                    href="#"
                    className="text-lg font-semibold relative hover:underline"
                    style={{ color: "#48DA7D" }}
                  >
                    {document.yearSchool}
                  </a>
                </div>
                <div className="flex items-center">
                  <i
                    className="fa-solid fa-eye fa-lg  mr-2"
                    style={{ color: "#2F3E4E" }}
                  ></i>
                  <a
                    href="#"
                    className="text-lg font-semibold relative hover:underline"
                    style={{ color: "#48DA7D" }}
                  >
                    {document.view}
                  </a>
                </div>
              </div>
            </div>
            <p className=" mb-4 mt-5" style={{ color: "#4D5966" }}>
              {document.description}
            </p>

            <div style={{ width: "full", marginTop: "20px" }}>
              <img src={document.image} alt="Document" className="rounded-lg" />
            </div>

            <div
              style={{
                marginTop: "20px",
                backgroundColor: "black",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <GoogleDriveViewer url={document.linkView} />
            </div>

            <div className="flex items-center justify-center mt-4">
              <GoogleDriveDownloader url={document.linkDownload} />
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
        <ToastContainer />
      </div>
    </>
  );
}

export default ProjectDetail;
