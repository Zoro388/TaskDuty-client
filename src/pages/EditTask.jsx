import React, { useContext, useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import AuthContext from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utilis/axiosInstance";

const EditTask = () => {
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      return setShowLoginModal(true);
    }

    const getData = async () => {
      try {
        // console.log("Token:", token);
        const { data } = await axiosInstance.get(`/api/task/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setTasks(data);
        console.log(data);

        setTitle(data.data.title);
        setDescription(data.data.description);
        setTags(data.data.tags);
      } catch (error) {}
    };

    getData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return setShowLoginModal(true);
    }

    const { data } = await axiosInstance.patch(
      `/api/task/${id}`,
      {
        title,
        description,
        tags,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(data);
    navigate("/task");
  };

  return (
    <div className="container text-start">
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onSwap={() => setShowSignUpModal(true)}
      />
      <SignupModal
        show={showSignUpModal}
        onHide={() => setShowSignUpModal(false)}
        onSwap={() => setShowLoginModal(true)}
      />
      <div className="d-flex py-4 align-items-center gap-3">
        <p className="m-0">icon</p>
        <h2 className="m-0">Edit Task</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        action=""
        className="d-flex flex-column gap-5 py-3"
      >
        <div className="position-relative">
          <label
            htmlFor="Title"
            className="label1 position-absolute bg-white px-2 text-secondary fw-semibold fs-4"
          >
            Task Title
          </label>
          <input
            className="w-100 border py-3 rounded-2 px-4"
            placeholder="E.g Project Defense, Assignment....."
            type="text"
            id="title"
            value={title || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="position-relative">
          <label
            htmlFor="Description"
            className="label2 position-absolute bg-white px-2 text-secondary fw-semibold fs-4"
          >
            Description
          </label>
          <textarea
            className="w-100 border rounded-2 px-4 py-3"
            placeholder="Briefly describe your task......"
            name=""
            id="description"
            cols="30"
            rows="10"
            value={description || ""}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="position-relative">
          <label
            className="label3 position-absolute bg-white px-2 text-secondary fw-semibold fs-4"
            htmlFor="tags"
          >
            Tags
          </label>
          <input
            className="w-100 border py-3 rounded-2 px-4"
            placeholder="Urgent Important"
            type="text"
            id="tags"
            value={tags || ""}
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />
        </div>
        <button className="w-100 py-3 border-0 rounded-3 bg-danger text-white">
          Done
        </button>
        <a href="#" className="text-center">
          Back To Top
        </a>
      </form>
    </div>
  );
};

export default EditTask;
