import React, { useState } from 'react';
import './ProfileEdit.css'


function ProfileEdit({ user, updateUserProfile }) {
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  

  const handleSave = () => {
    if (newName.trim() === '') {
      alert('Please enter a valid name');
      return;
    }

    fetch(`/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newName }),
      })
        .then((response) => response.json())
        .then((updatedProfile) => {
          updateUserProfile(updatedProfile);
          alert('Profile updated successfully');
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          alert('An error occurred while updating the profile');
        });
    };


  return (
<div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">
    <div className="rounded-lg shadow-xl bg-gray-900 text-white" style={{ width: '450px' }}>
        <div className="border-b border-gray-800 px-8 py-3">
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-500"></div>
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300"></div>
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-green-400"></div>
        </div>
        <div className="px-8 py-6">
            <button onClick={handleSave}>&nbsp;&nbsp;&nbsp;&nbsp;<label htmlFor="newName">New Name:</label>
,</button>
            <input classname= "text-black"
          type="text"
          id="newName"
          value={newName}
          onChange={handleNameChange} />
,
<button onClick={handleSave}>&nbsp;&nbsp;&nbsp;&nbsp;<label htmlFor="newName">Click to Save</label>
,</button>
            <p>{'}'}</p>
        </div>
    </div>
</div>
    
 
  );
}

export default ProfileEdit;


