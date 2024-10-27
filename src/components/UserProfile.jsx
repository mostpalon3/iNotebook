import React, { useContext } from 'react'
import './UserProfile.css'
import NoteContext from '../context/Notes/noteContext'

const UserProfile = () => {
  const context = useContext(NoteContext);
  const {myStyle} = context;
  return (
    <div className='container user-container'>
      <div className='user-profile'>
        <div className="name-tag">
        SS
        </div>
      </div>
      <div className="name">Sumit Sagar</div>
    </div>
  )
}

export default UserProfile
