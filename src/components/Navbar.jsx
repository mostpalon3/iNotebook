import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import NoteContext from "../context/Notes/noteContext";

const Navbar = () => {
  const Navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    Navigate('/login')
  }
  let location = useLocation();
  // useEffect(() => {
  //  console.log(location);
  // }, [location]);

  const context = useContext(NoteContext);
  const {mode} = context;

  return (
    <nav className={`navbar navbar-expand-lg bg-${mode}`} data-bs-theme={mode}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className= {`nav-link ${location.pathname}==="/"?"active":""}`}  aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname}==="/about"?"active":""}`} to="/about">
                About
              </Link>
            </li>
          </ul>

          <Button/>

          {!localStorage.getItem('token') ? (
            <form className="d-flex">
              {location.pathname === '/login' ? (
                <button className="btn btn-primary mx-1" disabled>
                  Login
                </button>
              ) : (
                <Link className="btn btn-primary mx-1" to="/login">
                  Login
                </Link>
              )}
              {location.pathname === '/signup' ? (
                <button className="btn btn-secondary mx-2" disabled>
                  Sign Up
                </button>
              ) : (
                <Link className="btn btn-secondary mx-2" to="/signup">
                  Sign Up
                </Link>
              )}
            </form>
          ) : (
            <button className="btn btn-primary" onClick={handleLogout}>Log Out</button>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
