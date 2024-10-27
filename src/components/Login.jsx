import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

const Login = (props) => {
  const host = process.env.REACT_APP_BACKEND_URL;
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

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
      {loaded ?<Spinner/> :
        <div className="mt-2 bg-credentials">
          <h2 className="my-3">Login to continue to iNotebook</h2>
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
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>}
    </>
  );
};

export default Login;