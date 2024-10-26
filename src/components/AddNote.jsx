import React,{useContext, useState} from 'react'
import NoteContext from '../context/Notes/noteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context;
    const[note,setNote] = useState({title:"",description:"",tag:"default"})
  const handleClick = (e)=> {
    e.preventDefault();//taaki page reload na ho
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:"default"})
    props.showAlert("Added successfully","success");
  }
  const onChange = (e) => {
    setNote({...note, [e.target.name]:e.target.value})//JO V NAME HAI USKE VALUE K BARABR HO JAYR
  }

  return (
    <div>
            <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name='title'
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
              minLength={5}
                    required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name='description'
              id="description"
              onChange={onChange}
              value={note.description}
              minLength={5}
                    required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              name='tag'
              id="tag"
              value={note.tag==='default'?'':note.tag}
              onChange={onChange}
            />
          </div>
          <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote;
