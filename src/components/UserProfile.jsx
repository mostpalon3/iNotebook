import React, { useContext } from 'react'
import './UserProfile.css'
import NoteContext from '../context/Notes/noteContext'

const UserProfile = () => {
  const context = useContext(NoteContext);
  const { myStyle } = context;
  const containerStyle = {
    color: myStyle.color === 'white' ? 'black' : 'white',
    backgroundColor: myStyle.backgroundColor === 'black' ? 'white' : 'black',
  };

  return (
    <div className='container user-container'>
      <div className='user-profile' style={containerStyle}>
        <div className="name-tag" style={{color:myStyle.color==='black'?'white':'black'}}>
        SS
        </div>
      </div>
      <div className="name" style={{color:myStyle.color}}>Sumit Sagar</div>
    </div>
  )
}

export default UserProfile
