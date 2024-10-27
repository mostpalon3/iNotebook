import React,{useContext} from 'react';
import './About.css'
import NoteContext from '../context/Notes/noteContext';

const About = () => {
  const context = useContext(NoteContext);
  const {myStyle} = context;
  return (
    <div className='container' >
<div className="container about-box" style={myStyle.color === 'white' ? { borderColor: 'black' } : { borderColor: 'white' }}>
        <h1 className='text-center' >iNotebook Mern Project</h1>
        <div className="about-card">
          <ul>
            <li>This is a Mern project which is mainly  <strong>REACTJS FOCUSED</strong> with a basic server having rest api which support login and uses the CRUD operation.</li>
            <li>This site have <strong>Login & Sign Up </strong>feature to have seperate user , and store notes for each user independentily.</li>
            <li>You can add,delete,edit and read your notes on this web application.</li>
            <li>This site supports dark and light mode too</li>
            <li>This is copyrighted to the creator of this web application - <strong>Sumit Sagar.</strong></li>
          </ul>
        </div>
     </div>
    </div>
  )
}

export default About;
