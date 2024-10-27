import React from "react";
import "./Noteitem.css";

const LoadingCard = ({ myStyle }) => {
  return (
    <div className="col-md-3">
      <div className="card card-css my-2" style={myStyle}>
        <div className="card-body card-content" style={myStyle}>
          <div className="d-flex align-items-center" style={myStyle}>
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <i className="fa-regular fa-trash-can mx-2 placeholder"></i>
            <i className="fa-solid fa-pen-to-square mx-2 placeholder"></i>
          </div>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-12"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;