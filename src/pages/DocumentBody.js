import React from "react";
import GoogleDriveViewer from "../component/GoogleDriveViewer";
import GoogleDriveDownloader from "../component/GoogleDriveDownloader";

const DocumentBody = ({ document }) => {
  return (
    <div>
      <div className="mt-2">
        <div className="flex items-center space-x-8">
          <DocumentDetail
            iconClass="fa-solid fa-school fa-lg"
            color="#2F3E4E"
            text={document?.nameSchool}
          />
          <DocumentDetail
            iconClass="fa-solid fa-book fa-lg"
            color="#2F3E4E"
            text={document?.nameSubject}
          />
          <DocumentDetail
            iconClass="fa-solid fa-calendar-days fa-lg"
            color="#2F3E4E"
            text={document?.yearSchool}
          />
          <DocumentDetail
            iconClass="fa-solid fa-eye fa-lg"
            color="#2F3E4E"
            text={document?.view}
          />
        </div>
      </div>
      <p className="mb-4 mt-5" style={{ color: "#4D5966" }}>
        {document?.description}
      </p>

      <div style={{ width: "full", marginTop: "20px" }}>
        <img src={document?.image} alt="Document" className="rounded-lg" />
      </div>

      <div
        style={{
          marginTop: "20px",
          backgroundColor: "black",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <GoogleDriveViewer url={document?.linkView} />
      </div>

      <div className="flex items-center justify-center mt-4">
        <GoogleDriveDownloader url={document?.linkDownload} />
      </div>
    </div>
  );
};
const DocumentDetail = ({ iconClass, color, text }) => {
  return (
    <div className="flex items-center">
      <i className={iconClass + " mr-2"} style={{ color: color }}></i>
      <a
        href="#"
        className="text-lg font-semibold relative hover:underline"
        style={{ color: "#48DA7D" }}
      >
        {text}
      </a>
    </div>
  );
};
export default DocumentBody;
