import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubject = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    code: "",
    name: "",
    description: "",
    document: 0,
    status: 0,
    view: 0,
    avartar: "",
    backGround: "",
    like: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSubject = () => {
    // Validate the required fields
    if (!formData.code || !formData.name || !formData.description) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    fetch(`${API_BASE_URL}/api/Subject`, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.success("Subject added successfully!");
          setSuccess(true);
        } else {
          toast.error("Failed to add subject.");
        }

        setLoading(false);
      })
      .catch((error) => {
        toast.error("An error occurred: " + error.message);
        console.error("Error adding subject:", error);
        setLoading(false);
        setSuccess(false);
      });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Subject</h1>
      <div className="grid gap-4 mb-4">
        <input
          className="border p-2"
          type="text"
          name="code"
          placeholder="Code"
          value={formData.code}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          className="border p-2"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="text"
          name="avartar"
          placeholder="Avatar URL"
          value={formData.avartar}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          type="text"
          name="backGround"
          placeholder="Background URL"
          value={formData.backGround}
          onChange={handleChange}
        />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleAddSubject}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Subject"}
      </button>
      {success && (
        <div className="text-green-500 mt-4">
          Subject has been added successfully!
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AddSubject;
