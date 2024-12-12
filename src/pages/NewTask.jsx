import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import LoginModal from "../components/LoginModal";
import axiosInstance from "../utilis/axiosInstance";
import SignupModal from "../components/SignupModal";

export const NewTask = () => {
  const { name, token } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      return setShowLoginModal(true);
    }

    const { data } = await axiosInstance.post(
      "/api/task",
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
        <h2 className="m-0">New Task</h2>
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
