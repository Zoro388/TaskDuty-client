import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utilis/axiosInstance";
import AuthContext from "../context/AuthContext";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
// import { Link } from "react-router-dom";

const AllTasks = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    if (!token) {
      return setShowLoginModal(true);
    }

    const getData = async () => {
      try {
        // console.log("Token:", token);
        const { data } = await axiosInstance.get("/api/task", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(data);
        console.log(data);
        setTasks(data.data);
      } catch (error) {}
    };

    getData();
  }, [token]);
  return (
    <div className="container">
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
      <div>
        <p>My Tasks</p>
        <Link to="/new">Add New Task</Link>
      </div>
      <div className="d-flex flex-column gap-3">
        {tasks.map((task) => {
          return (
            <div key={task._id} className="border p-3 rounded-3 text-start">
              <div className="d-flex justify-content-between border-bottom mb-3">
                <p>{task.tags}</p>
                <div>
                  <Link className="btn" to={`/edit/${task._id}`}>
                    Edit
                  </Link>
                  <Link className="btn">Delete</Link>
                </div>
              </div>
              <p className="fs-3 fw-semibold">{task.title}</p>
              <p>{task.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTasks;
