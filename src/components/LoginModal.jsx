import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthContext from "../context/AuthContext";

const LoginModal = (props) => {
  const { signInUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser({ username, password }, props);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-4 p-5"
        action=""
      >
        <h2 className="text-start">Login</h2>
        <div>
          <input
            className="w-100 border rounded-3 py-3 px-2"
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="w-100 border rounded-3 py-3 px-2"
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="btn bg-primary text-white">Login</button>
        <p>
          Don't have an account?{" "}
          <a
            href="#"
            onClick={() => {
              props.onSwap();
              props.onhide();
            }}
          >
            Sign up
          </a>
        </p>
      </form>
    </Modal>
  );
};

export default LoginModal;
