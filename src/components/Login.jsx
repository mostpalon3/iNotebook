import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const host = process.env.REACT_APP_BACKEND_URL;
    const [credentials,setCredentials]=useState({email:"",password:""})
    let navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch(
            `${host}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            }
          );
          const json = await response.json();
          console.log(json)
          if (json.success){
            //redirect and save the auth token
            localStorage.setItem('token',json.authToken)
            props.showAlert("Logged in Successfully","success")
            navigate("/")
          }else{
            props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials , [e.target.name]: e.target.value }); // Updates the respective field with its current value based on the input name.
      };

  return (
    <div className="mt-2 bg-credentials">
      <h2 className="my-3">Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
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
          />
          <div id="emailHelp" className="form-text" style={{color:'gray'}}>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            value={credentials.password}
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
