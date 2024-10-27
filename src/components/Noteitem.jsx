import React, { useContext } from "react"; //rafc
import NoteContext from "../context/Notes/noteContext";
import "./Noteitem.css"

const Noteitem = (props) => {
  const context = useContext(NoteContext)
  const {deleteNote,myStyle} = context;
  const { note,updateNote } = props;//props passed in Notes
  const cardStyle = {
    ...myStyle,
    boxShadow: myStyle.backgroundColor === "white" 
      ? "10px 10px 15px rgba(255, 255, 255, 0.27)"  // Light box shadow for dark background
      : "15px 15px 10px rgba(0, 0, 0, 0.2)"        // Dark box shadow for light background
  };
  return (
    <div className="col-md-3">
      <div className="card card-css my-2" style={cardStyle}>
        <div className="card-body card-content" style={myStyle}>
          <div className="d-flex align-items-center" style={myStyle}>
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-regular fa-trash-can mx-2"  onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully","success");}}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
