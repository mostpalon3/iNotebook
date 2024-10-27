import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async() => {
     //API Call
     const response = await fetch(
      `${host}/api/notes/fetchallnote`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        }
      }
    );
    if (!response.ok) {
      // Handle error (maybe log it or show a notification)
      console.error('Failed to fetch notes:', response.statusText);
      return; // Exit if the fetch fails
    }
    const json = await response.json();
    setNotes(json);
  };
  //Add a note
  const addNote = async(title, description, tag) => {
     //API Call
     const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const note = await response.json();
    setNotes(notes.concat(note));
    //Specifically, notes.push(note) modifies the array in place and returns the new length of the array, not the updated array. This leads to incorrect state updates.Mutating the state directly (notes.push(note)) should be avoided because React expects state updates to be done in an immutable way, so it can track changes and re-render appropriately.  
  };

  //Delete a note
  const deleteNote = async(id) => {
    console.log(`deleting a note with id ${id}`);
    //API call
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        }
      }
    );
    // eslint-disable-next-line
    const json = response.json();

    //upar backend se to delete ho gya but frontend me ussi tym update nai hoga, so yee neeche map krke ham frontend me update krare ussi waqt ui change krane k liye , setNotes krke uski uss waqt kee state ko change kar rhey
    //cnfrm krne k liye ye neeche wla comment krke dekh skte ho , state update nai hogi uske baad hence the reloading will be needed to fetched the notes that was updated after deletion  
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    //logic to edit in database 
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    // eslint-disable-next-line
    const json = await response.json();

    //Logic to edit in client
    //we can edit the notes directly so we need to create a deep copy of it then change it 
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      let element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    //dekh yha hamne pehle copied array me changes kare fir hamne state ko setNotes wle tareeke se update kardiye 
    setNotes(newNotes);
  };

  const [mode,setMode] = useState('dark');
  const [myStyle, setMyStyle] = useState({
    color: 'black',
    backgroundColor: 'white'
});
const toggleDarkMode = () => {
  if (mode === 'light') {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
      setMode('dark');
      // showAlert('Light mode enabled.', 'success');
      setMyStyle({
          color: 'white',
          backgroundColor: 'black'
      });

  } else {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
      setMode('light');
      // showAlert('Dark mode enabled.', 'success');
      setMyStyle({
          color: 'black',
          backgroundColor: 'white'
      });
  }
}
  return (
    //ek bracket js use krne k liye ek curly object k liye
    <NoteContext.Provider value={{
       notes, addNote, deleteNote, editNote,getNotes,mode,myStyle,toggleDarkMode 
       }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;