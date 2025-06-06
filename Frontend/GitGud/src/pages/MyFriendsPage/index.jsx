import React, { useState } from 'react';
import '../../styles/MyFriendsPage.scss';

const dummyFriends = [
  {
    id: 1,
    name: 'Andrei Popescu',
    projects: ['SmartHome App', 'E-Book Reader']
  },
  {
    id: 2,
    name: 'Ioana Georgescu',
    projects: ['Health Tracker']
  },
  {
    id: 3,
    name: 'Mihai Ionescu',
    projects: ['AI Chatbot', 'Portfolio Site', 'Game Engine']
  }
];

const MyFriendsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [newFriend, setNewFriend] = useState('');

  const handleAddFriend = () => {
    if (newFriend.trim() !== '') {
      console.log('Add friend:', newFriend);
      setNewFriend('');
      setShowForm(false);
    }
  };

  return (
    <div className="my-friends-page container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Friends</h2>
        <button className="btn btn-orange" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Friend'}
        </button>
      </div>

      {showForm && (
        <div className="add-friend-form mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter friend's username or ID"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleAddFriend}>Submit</button>
        </div>
      )}

      <div className="friend-list">
        {dummyFriends.map((friend) => (
          <div className="friend-card mb-4 p-3 border rounded" key={friend.id}>
            <h5>{friend.name}</h5>
            <p><strong>Projects:</strong></p>
            <ul>
              {friend.projects.map((proj, index) => (
                <li key={index}>{proj}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFriendsPage;
