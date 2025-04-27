import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../components/Profile';

const ProfilePage = () => {
  const { userId } = useParams();
  
  // In a real app, you would get this from your auth context
  const currentUser = {
    id: 'current-user-id', // This would come from your auth state
    isAdmin: false // This would come from your auth state
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Profile 
        userId={userId || currentUser.id} 
        isAdmin={currentUser.isAdmin} 
      />
    </div>
  );
};

export default ProfilePage;