import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from '../components/user/Signup';
import Login from '../components/user/Login';
import Kakao from '../components/user/Kakao';
import TOS from '../components/user/TOS';
import '../styles/User.scss';

const User = () => {
  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="tos" element={<TOS />} />
      <Route path="kakao/:data" element={<Kakao />} />
    </Routes>
  );
};

export default User;
