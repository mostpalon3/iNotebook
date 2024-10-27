import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/Notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { getItemAsync } from "../utility/localStorageUtils";
import LoadingCard from "./LoadingCard";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote,myStyle } = context;
  let navigate = useNavigate();

  // Loading state to manage fetching status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await getItemAsync("token");
      if (token) {
        await getNotes(); // Await the notes fetching
        setLoading(false); // Set loading to false after notes are fetched
      } else {
        props.showAlert("Login/Sign Up to access the iNotebook", "warning");
        navigate("/login");
      }
    };

    checkLogin();
  }, [getNotes, navigate, props]);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        demo
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    name="edescription"
                    id="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="etag"
                    id="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                type="submit"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {loading ? (
          <LoadingCard myStyle={myStyle}/> // Show loading card while fetching notes
        ) : notes.length === 0 ? (
          <div className="container">No notes to display</div>
        ) : (
          notes.map((note) => (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Notes;