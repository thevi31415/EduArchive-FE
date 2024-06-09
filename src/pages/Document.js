import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners"; // import ClipLoader từ react-spinners
import DocumentCard from "../component/DocumentCard";

function Document() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/document`)
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data.data);
        setLoading(false); // Khi dữ liệu đã được tải xong, đặt loading thành false
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
        setLoading(false); // Xử lý lỗi: đặt loading thành false
      });
  }, []);

  return (
    <div style={{ margin: 20, marginLeft: 60, marginRight: 60 }}>
      <h1 className="text-3xl font-bold underline bg-gray-50">Document</h1>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <ClipLoader color={"#60B557"} loading={loading} size={100} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {documents.map((document) => (
            <div key={document.id}>
              <Link to={`/document/${document.id}`}>
                {" "}
                <DocumentCard document={document} />
              </Link>
            </div>
          ))}
        </div>
      )}
      <h1>Length: {documents.length}</h1>
    </div>
  );
}

export default Document;
