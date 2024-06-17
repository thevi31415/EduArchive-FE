import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const AddDocument = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    typeDocument: "",
    nameAuthor: localStorage.getItem("useName") || "",
    idAuthor: localStorage.getItem("userId") || "",
    userAuthor: localStorage.getItem("userName") || "",
    image: "",
    linkDownload: "",
    linkView: "",
    yearSchool: "",
    idSubject: "",
    nameSubject: "",
    idSchool: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    nameSchool: "Đại học SPKT TPHCM",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    fetch(`${API_BASE_URL}/api/Subject`, {
      method: "GET",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const sortedSubjects = data.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setSubjects(sortedSubjects);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDocument = () => {
    // Kiểm tra các trường thông tin
    if (
      !formData.slug ||
      !formData.title ||
      !formData.description ||
      !formData.typeDocument ||
      !formData.image ||
      !formData.linkDownload ||
      !formData.linkView ||
      !formData.yearSchool ||
      !formData.idSubject ||
      !formData.nameSubject
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    fetch(`${API_BASE_URL}/api/Document`, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        view: 0,
        status: 0,
        createDate: new Date().toISOString(),
        like: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.success("Thêm tài nguyên thành công !" + data.status);
        } else {
          toast.errors("Không thể thêm tài nguyên mới !" + data.status);
        }

        setLoading(false);
        setSuccess(true);
      })
      .catch((error) => {
        toast.error("Đã xảy ra lỗi !");
        console.error("Error adding document:", error);
        setLoading(false);
        setSuccess(false);
      });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Document</h1>
      <div className="grid gap-4 mb-4">
        <input
          className="border p-2"
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          className="border p-2"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <select
          className="border p-2"
          name="typeDocument"
          value={formData.typeDocument}
          onChange={handleChange}
        >
          <option value="">Select Type Document</option>
          <option value="DeThi">Đề thi</option>
          <option value="DoAn">Đồ Án</option>
          <option value="TaiLieu">Tài liệu</option>
        </select>

        <input
          className="border p-2"
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="text"
          name="linkDownload"
          placeholder="Link Download"
          value={formData.linkDownload}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="text"
          name="linkView"
          placeholder="Link View"
          value={formData.linkView}
          onChange={handleChange}
        />
        <select
          className="border p-2"
          name="yearSchool"
          value={formData.yearSchool}
          onChange={handleChange}
        >
          <option value="">Select Year School</option>
          <option value="HK1 2021-2022">HK1 2021-2022</option>
          <option value="HK2 2021-2022">HK2 2021-2022</option>
          <option value="HK3 2021-2022">HK3 2021-2022</option>
          <option value="HK1 2022-2023">HK1 2022-2023</option>
          <option value="HK2 2022-2023">HK2 2022-2023</option>
          <option value="HK3 2022-2023">HK3 2022-2023</option>
          <option value="HK1 2023-2024">HK1 2023-2024</option>
          <option value="HK2 2023-2024">HK2 2023-2024</option>
          <option value="HK3 2023-2024">HK3 2023-2024</option>
          <option value="HK1 2024-2025">HK1 2024-2025</option>
          <option value="HK2 2024-2025">HK2 2024-2025</option>
          <option value="HK3 2024-2025">HK3 2024-2025</option>
          <option value="HK1 2025-2026">HK1 2025-2026</option>
          <option value="HK2 2025-2026">HK2 2025-2026</option>
          <option value="HK3 2025-2026">HK3 2025-2026</option>
        </select>
        <select
          className="border p-2"
          name="idSubject"
          value={formData.idSubject}
          onChange={(e) => {
            const selectedSubject = subjects.find(
              (subject) => subject.id === e.target.value
            );
            setFormData({
              ...formData,
              idSubject: e.target.value,
              nameSubject: selectedSubject ? selectedSubject.name : "",
            });
          }}
        >
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <select
          className="border p-2"
          name="idSchool"
          value={formData.idSchool}
          onChange={handleChange}
          disabled
        >
          <option value="3fa85f64-5717-4562-b3fc-2c963f66afa6">
            Đại học SPKT TPHCM
          </option>
        </select>
        <input
          className="border p-2"
          type="text"
          name="nameSchool"
          placeholder="Name School"
          value={formData.nameSchool}
          onChange={handleChange}
          disabled
        />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleAddDocument}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Document"}
      </button>
      {success && (
        <div className="text-green-500 mt-4">
          Document has been added successfully!
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddDocument;
