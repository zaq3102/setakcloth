import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../components/user/Signup';
import Login from '../components/user/Login';
import TOS from '../components/user/TOS';
import '../styles/User.scss';

const User = () => {
  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="tos" element={<TOS />} />
    </Routes>
  );
};

export default User;
