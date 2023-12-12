import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    var now = new Date();
    var userval = new Date(localStorage.getItem("expires"));
    if (now < userval) {
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    if (form.email === "" || form.email === undefined) {
      toast.error("Email is required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      return;
    }

    if (form.password === "" || form.password === undefined) {
      toast.error("Password is required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      return;
    }

    axios
      .post(
        process.env.REACT_APP_API_URL + "auth/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        toast.success("You have logged in Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("token", response.data.tokens.access.token);
        localStorage.setItem(
          "expires",
          new Date(response.data.tokens.access.expires)
        );
        setTimeout(function () {
          navigate("dashboard");
        }, 1500);
      })
      .catch(function (error) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      });
  };

  return (
    <>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: purple;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    body {
        background:url('./bg.png');
        background-size:cover;
    }
    form {
        background:rgba(7 172 216 / 18%);;
        padding:30px;
        border-radius:40px;
    }
    .btn-primary {
        background:#80bd41;
        border-color:#80bd41;
        text-align:center;
    }
    .form-label {
        color:white;
    }
    h1 {
        font-weight:bold;
        color:white;
    }
    `}
      </style>

      <div className="w-50 d-flex m-auto align-items-center justify-content-center min-vh-100">
        <Container className="bg">
          <form ref={formRef}>
            <h1 className="d-block text-center">Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={form.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={form.password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Group>
            <Button
              variant="primary"
              className="text-center"
              type="button"
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
          <ToastContainer />
        </Container>
      </div>
    </>
  );
};

export default Login;
