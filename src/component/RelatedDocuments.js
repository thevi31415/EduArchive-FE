import React from "react";
import { Link } from "react-router-dom"; // Thay đổi import này nếu bạn sử dụng routing khác
import ExamCard from "../component/ExamCard";
import ProjectCard from "../component/ProjectCard";
import { Tooltip } from "react-tooltip";

import DocumentCard from "../component/DocumentCard";
const RelatedDocuments = ({ subject, listDocuments, documentId }) => {
  const truncateName = (name) => {
    return name.length > 17 ? name.substring(0, 14) + "..." : name;
  };

  return (
    <div className="md:col-span-1">
      <Tooltip id="my-tooltip" />

      <h2 className="text-xl font-bold mb-4 text-center md:text-left">
        Related Documents
      </h2>
      <div
        className="border p-4 mb-4 mx-4 md:mx-auto md:max-w-md lg:max-w-lg"
        style={{ borderRadius: "10px" }}
      >
        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content={subject.description.substring(0, 120) + "..."}
          data-tooltip-place="top"
        >
          <div
            key={subject.id}
            className="bg-white rounded-lg p-4 hover:bg-green-100 transition duration-300 ease-in-out shadow-md border border-[#dee0e2] hover:border-[#3FDC85]"
            style={{
              margin: "10px",
              padding: "20px",
            }}
          >
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
              />
              <div>
                <a
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={subject.name}
                  data-tooltip-place="top"
                >
                  <h2
                    className="text-lg font-semibold"
                    style={{
                      color: "#3FDC85",
                      fontSize: "23px",
                      fontWeight: "450",
                    }}
                  >
                    {truncateName(subject.name)}
                  </h2>
                </a>

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
