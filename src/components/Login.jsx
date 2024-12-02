import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import Bg from "./Bg";
import './credentials.css';


const Login = (props) => {
  const host = process.env.REACT_APP_BACKEND_URL;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loaded, setLoaded] = useState(true); // Start as true to show loading initially
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    // Simulate loading delay for demonstration purposes
    const loadTimeout = setTimeout(() => {
      setLoaded(false); // Set loaded to false after a delay
    }, 1000); // Adjust the time as necessary

    return () => clearTimeout(loadTimeout); // Clear timeout on component unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaded(true);
    setError(null); // Reset error before submitting

    // Basic validation
    if (!credentials.email || !credentials.password) {
      setError("Email and password are required.");
      setLoaded(false);
      return;
    }

    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      setLoaded(false);

      if (json.success) {
        // Redirect and save the auth token
        localStorage.setItem('token', json.authToken);
        props.showAlert("Logged in Successfully", "success");
        navigate("/");
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    } catch (error) {
      setLoaded(false);
      setError("An error occurred. Please try again later.");
      console.error("Login error:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loaded ? (
        <Spinner />
      ) : (
        <div className="mt-2 ">
          <Bg/>
          <div className="cred-card">
          <h2 className="my-2 ">Login to iNotebook</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                onChange={onChange}
                value={credentials.email}
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                placeholder="Enter a valid Email Id"
                required
              />
              <div id="emailHelp" className="form-text" style={{ color: 'gray' }}>
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                onChange={onChange}
                value={credentials.password}
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter a valid password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <small className="form-text">New User?<Link className="primary mx-2" to="/signup">
                  Sign Up
                </Link></small>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;