import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const userDetail = user && user ? JSON.stringify(user) : "No user details available";

  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
      {/* <p className="mt-4">User: {userDetail}</p> */}   
    </div>
  );
}

export default Home;