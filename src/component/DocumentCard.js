import React from "react";

const DocumentCard = ({ document }) => {
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

  return (
    <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg bg-white m-4 transition duration-300 transform hover:scale-105">
      <div>
        <img
          className="w-full h-48 object-cover"
          src={document.image}
          alt="Document"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2" style={{ color: "#02FBA3" }}>
          {document.title}
        </h2>
        <div className="flex items-center text-gray-700 mb-1">
          <i className="fa-solid fa-user"></i>
          <span className="ml-3" style={{ fontWeight: "bold" }}>
            {document.nameAuthor}
          </span>
        </div>
        <div className="flex items-center text-gray-700 mb-1">
          <i className="fa-solid fa-school"></i>
          <span className="ml-2">{document.nameSchool}</span>
        </div>
        <div className="flex items-center justify-between text-gray-700 mb-1">
          <div className="flex items-center">
            <i className="fa-solid fa-book"></i>
            <span className="ml-2">{document.nameSubject}</span>
          </div>
          <div className="flex items-center">
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
        {/* <div className="flex items-center text-gray-700">
          <i className="fa-solid fa-eye"></i>
          <span className="ml-1">{document.view}</span>
        </div> */}
      </div>
    </div>
  );
};

export default DocumentCard;
