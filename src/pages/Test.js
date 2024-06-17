import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import DocumentCard from "../component/DocumentCard";
import { ToastContainer, toast } from "react-toastify";
import ExamCard from "../component/ExamCard";
import ProjectCard from "../component/ProjectCard";
import { Tooltip } from "react-tooltip";

function SubjectDetail() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  return (
    <>
      <div className="container mx-auto my-5 px-4">
        <div
          className=" rounded-2xl gradient-background"
          style={{ borderWidth: "1px" }}
        >
          <div className="relative">
            <img
              src={require("./images/bg_green.jpg")}
              alt="Cover"
              className="w-full h-40 object-cover rounded-t-2xl"
            />
            <div className="absolute top-24 w-full flex justify-center md:left-8 md:w-auto">
              <img
                src={subject?.avartar}
                alt="Profile"
                className=" rounded-lg object-cover border-4 border-white shadow-md"
                style={{ width: "120px", height: "120px" }}
              />
            </div>
          </div>
          <div
            className=" px-5 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center"
            style={{ marginTop: "55px" }}
          >
            <div className="flex flex-col text-center md:text-left">
              <h1
                className=" text-3xl"
                style={{ color: "#3FDC85", fontWeight: "500" }}
              >
                {subject?.name}
              </h1>
              <p className="mt-2 text-xl  text-gray-800">{subject?.code}</p>
              <div className="flex justify-center md:justify-start mt-3 md:px-0">
                <button className=" bg-green-400  hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg">
                  <i class="fa-solid fa-plus"></i> Theo dõi môn học
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubjectDetail;
