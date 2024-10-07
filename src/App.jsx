import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const location = useLocation();
  const email = location.state?.email; // Retrieve the email from state
  const [member, setMember] = useState('');
  const [trip, setTrip] = useState('');
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  const handleAddMember = () => {
    if (member.trim() !== '') {
      setMembers([...members, member]);
      setMember('');
    }
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  const handleCreateGroup = async () => {
    const uniqueMembers = new Set(members);
    if (uniqueMembers.size > 1) {
      navigate('/payment/' , { state: { email : email , tripName: trip, mem: [...uniqueMembers] } });
    } else {
      alert('Please add more than one unique member.');
    }
  };

  return (
    <>
      <div className='nava'>
        <div className="logo">
          <div className="logo_img">
            <img src="https://i.imghippo.com/files/oY3oR1720359657.png" alt="error"></img>
          </div>
          <div className="logo_nam">FairShare</div>
        </div>
        <div style={{display:'flex',alignItems:'center',paddingRight:'50px'}}>
        {email}
      </div>
      </div>
      <div className="splitto-container">
        <div className="group-name">
          <label>Trip Name:</label>
          {/* <label>{email}</label> */}
          <input
            type="text"
            value={trip}
            onChange={(e) => setTrip(e.target.value)}
            placeholder="Chopta Trip"
          />
        </div>
        <div className="member-input">
          <label>Member Name:</label>
          <input
            type="text"
            value={member}
            onChange={(e) => setMember(e.target.value)}
            placeholder="Enter member name"
          />
          <button className="add-button" onClick={handleAddMember}>
            Add
          </button>
        </div>
        <ul>
          {members.map((m, index) => (
            <li key={index}>
              {m}
              <button className="remove-button" onClick={() => handleRemoveMember(index)}>
                &times;
              </button>
            </li>
          ))}
        </ul>
        <button className="create-group" onClick={handleCreateGroup}>
          Create a group
        </button>
      </div>
    </>
  );
};

export default App;