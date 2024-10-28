import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Bg from "./Bg";
import './credentials.css'

const Signup = (props) => {
  const host = process.env.REACT_APP_BACKEND_URL;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [loaded, setLoaded] = useState(true);
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
    setError(null);
    const { name, email, password } = credentials; //yha pehle hee nikal diya credentials se
    if (!name || !email || !password) {
      setError("Name, Email and password are required.");
      setLoaded(false);
      return;
    }
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      setLoaded(false);
      if (json.success) {
        //redirect and save the auth token
        localStorage.setItem("token", json.authToken);
        navigate("/");
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert("Invalid Details", "danger");
      }
    } catch (error) {
      setLoaded(false);
      setError("An error occurred. Please try again later.");
      console.error("Login error:", error);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); // Updates the respective field with its current value based on the input name.
  };
  //onSubmit use krne ka sabse bada fayeda ye hai kee ham min length aur required jaisi chiz use kar skte hai in buiult browser ka validation mil jata hai

  return (
    <>
     {loaded ?<Spinner/> : (
        <div className="mt-2">
          <Bg/>
          <div className="cred-card" style={{height:"28rem"}}>
          <h2 className="my-2">Create an account to use iNotebook</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={onChange}
                aria-describedby="emailHelp"
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={onChange}
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={onChange}
                required
                minLength={5}
                placeholder="Password"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                onChange={onChange}
                required
                minLength={5}
                placeholder="Confirm Password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        </div>
      )}
    </>
  );
};

export default Signup;
