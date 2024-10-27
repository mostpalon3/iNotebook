import React, { useContext } from "react";
import NoteContext from "../context/Notes/noteContext";
import "./Noteitem.css";
import LoadingCard from "./LoadingCard";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote, myStyle } = context;
  const { note, updateNote } = props;

  // Define card style with conditional box shadow
  const cardStyle = {
    ...myStyle,
    boxShadow: myStyle.backgroundColor === "white" 
      ? "10px 10px 10px rgba(255, 255, 255, 0.20)"  // Light box shadow for dark background
      : "15px 15px 10px rgba(0, 0, 0, 0.2)"          // Dark box shadow for light background
  };

  // Conditional rendering for LoadingCard or Note component
  return (
    !note ? (
      <LoadingCard myStyle={cardStyle} />
    ) : (
      <div className="col-md-3">
        <div className="card card-css my-2" style={cardStyle}>
          <div className="card-body card-content" style={myStyle}>
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <i
                className="fa-regular fa-trash-can mx-2"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted successfully", "success");
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => updateNote(note)}
              ></i>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Noteitem;