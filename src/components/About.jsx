import React,{useContext} from 'react';
import './About.css'
import NoteContext from '../context/Notes/noteContext';

const About = () => {
  const context = useContext(NoteContext);
  const {myStyle} = context;
  return (
    <div className="container my-5" >
      <div className="card shadow-lg" style={myStyle.backgroundColor === 'black' ? { borderColor: 'black',color:"black",backgroundColor:"white" } : { borderColor: 'white',color:"white",backgroundColor:"black" }}>
        <div className="card-header bg-secondary text-white">
          <h3 className="text-center">MERN Project Overview</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">A Modern Web Application Built with ReactJS and MERN Stack</h5>
          <p className="card-text">
            This web application is a full-stack MERN project, focusing primarily on <strong>ReactJS</strong> for delivering a seamless, interactive, and responsive user experience. The backend is powered by RESTful APIs, ensuring efficient user management and CRUD (Create, Read, Update, Delete) operations for managing personal notes.
          </p>
          <h6 className="mt-4"><strong>Key Features:</strong></h6>
          <ul className="list-unstyled">
            <li><strong>User Authentication:</strong> Secure login and sign-up functionalities allow users to create and maintain private accounts, ensuring data separation and personalized experiences.</li>
            <li><strong>Personalized Note Management:</strong> Users can add, edit, delete, and read their notes. Each entry is stored independently, ensuring privacy and organization.</li>
            <li><strong>Dark & Light Mode:</strong> Toggle between dark and light modes to suit your visual preference, making it comfortable to use in various lighting conditions.</li>
          </ul>
          <p className="mt-4">
            This application is a product of dedicated design and development by <strong>Sumit Sagar</strong>. All rights reserved by the original creator.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About;
