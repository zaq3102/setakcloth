import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../components/user/Signup';
import Login from '../components/user/Login';

const User = () => {
  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default User;
