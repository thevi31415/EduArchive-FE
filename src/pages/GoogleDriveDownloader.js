import React from "react";

const GoogleDriveDownloader = ({ url }) => {
  const extractFileId = (url) => {
    const regex = /[-\w]{25,}/;
    const match = url.match(regex);
    return match ? match[0] : null;
  };

  const fileId = extractFileId(url);

  if (!fileId) {
    return <div>Invalid Google Drive URL</div>;
  }

  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  return (
    <div>
      <a
        href={downloadUrl}
        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
        download
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="flex items-center">
          <i
            className="fa-solid fa-download fa-lg"
            style={{ marginRight: "10px" }}
          ></i>
          Download
        </span>
      </a>
    </div>
  );
};

export default GoogleDriveDownloader;
