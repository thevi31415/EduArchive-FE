import React from "react";
import { Link } from "react-router-dom"; // Thay đổi import này nếu bạn sử dụng routing khác
import ExamCard from "../component/ExamCard";
import ProjectCard from "../component/ProjectCard";

import DocumentCard from "../component/DocumentCard";
const RelatedDocuments = ({ subject, listDocuments, documentId }) => {
  return (
    <div className="md:col-span-1">
      <h2 className="text-xl font-bold mb-4 text-center md:text-left">
        Related Documents
      </h2>

      <div
        className="border p-4 mb-4 mx-4 md:mx-auto md:max-w-md lg:max-w-lg"
        style={{ borderRadius: "10px" }}
      >
        <Link
          className="bg-green-100 p-4 flex items-center space-x-4 mx-auto transition duration-300 ease-in-out transform hover:bg-green-200 hover:scale-105"
          style={{ borderRadius: "10px" }}
          to={`/subject/${subject?.id}`}
        >
          <img
            className="w-16 h-16 md:w-24 md:h-24"
            src={require("../pages/images/books.png")}
            alt="Document"
          />
          <div>
            <p
              className="hover:underline"
              style={{
                fontSize: "25px",
                color: "#3BC61D",
                fontWeight: "600",
              }}
            >
              {subject?.name}
            </p>
            <p
              className=""
              style={{
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {subject?.code}
            </p>
            <div className="text-gray-800 text-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-green-500">
                  <i className="fa-solid fa-file"></i>
                  <span style={{ color: "#323f48", fontWeight: "bold" }}>
                    {subject?.document}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-green-500">
                  <i className="fa-solid fa-eye"></i>
                  <span style={{ color: "#323f48", fontWeight: "bold" }}>
                    {subject?.view}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-green-500">
                  <i className="fa-solid fa-heart"></i>
                  <span style={{ color: "#323f48", fontWeight: "bold" }}>
                    {subject?.like}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {listDocuments?.slice(0, 6).map(
          (relatedDoc) =>
            relatedDoc.id !== documentId && (
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
            )
        )}
      </div>
    </div>
  );
};

export default RelatedDocuments;
