import React from "react";

const ExamCard = ({ document }) => {
  let documentTypeTag;
  let documentTypeColor;

  switch (document.typeDocument) {
    case "DeThi":
      documentTypeTag = "Đề thi";
      documentTypeColor = "#02FBA3"; // Green color
      break;
    case "DoAn":
      documentTypeTag = "Đồ án";
      documentTypeColor = "#FFD700"; // Yellow color
      break;
    case "TaiLieu":
      documentTypeTag = "Tài liệu";
      documentTypeColor = "#4169E1"; // Blue color
      break;
    default:
      documentTypeTag = "Không xác định";
      documentTypeColor = "#000000"; // Black color
  }
  const truncateName = (name, size) => {
    return name.length > size ? name.substring(0, size) + "..." : name;
  };

  return (
    <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-md bg-white m-4 transition duration-300 transform hover:scale-105">
      <div>
        <img
          className="w-full h-48 object-cover"
          src={document.image}
          alt="Document"
        />
      </div>
      <div className="p-4">
        <h2
          className="mb-3"
          style={{ color: "#48DA7D", fontSize: "19px", fontWeight: "500" }}
        >
          📋{document.title}
        </h2>
        <div
          className="flex items-center text-gray-700 mb-1"
          style={{ color: "#9CA3B2" }}
        >
          <i className="fa-solid fa-user"></i>
          <span className="ml-2" style={{ color: "#9CA3B2" }}>
            {document.nameAuthor}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-700 mb-1">
          <div className="flex items-center" style={{ color: "#9CA3B2" }}>
            <i className="fa-solid fa-book"></i>
            <span className="ml-2" style={{ color: "#9CA3B2" }}>
              {truncateName(document.nameSubject, 14)}
            </span>
          </div>
          <div className="flex items-center" style={{ color: "#9CA3B2" }}>
            <i className="fa-solid fa-calendar-days"></i>
            <span className="ml-2">{document.yearSchool}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-700">
          <span
            className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 m-"
            style={{ backgroundColor: documentTypeColor, color: "white" }}
          >
            {documentTypeTag}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
