import React from "react";

const GoogleDriveViewer = ({ url }) => {
  const extractFileId = (url) => {
    const regex = /[-\w]{25,}/;
    const match = url.match(regex);
    return match ? match[0] : null;
  };

  const fileId = extractFileId(url);

  if (!fileId) {
    return <div>Invalid Google Drive URL</div>;
  }

  return (
    <div>
      <iframe
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        width="100%"
        height="1000px"
        allow="autoplay"
        style={{ border: "none", marginTop: "20px" }}
        title="Google Drive Document"
      ></iframe>
    </div>
  );
};

export default GoogleDriveViewer;
