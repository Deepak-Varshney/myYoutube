import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
console.log(userId)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={profile.profilePicture} alt={`${profile.username}'s profile`} />
      <h1>{profile.channelName}</h1>
      <p>{profile.about}</p>
      <p>Email: {profile.email}</p>
      <p>Username: {profile.username}</p>
      <p>Created At: {new Date(profile.createdAt).toLocaleDateString()}</p>
      <p>Updated At: {new Date(profile.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;
