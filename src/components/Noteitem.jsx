import React, { useContext } from "react"; //rafc
import NoteContext from "../context/Notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(NoteContext)
  const {deleteNote,myStyle} = context;
  const { note,updateNote } = props;//props passed in Notes
  return (
    <div className="col-md-3">
      <div className="card" style={myStyle}>
        <div className="card-body" style={myStyle}>
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
