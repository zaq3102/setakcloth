import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import CtmMypage from '../components/user/customer/CtmMypage';
import Home from '../components/user/customer/CtmHome';
import '../styles/Customer.scss';

const Customer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mypage" element={<CtmMypage />} />
    </Routes>
  );
};

export default Customer;
