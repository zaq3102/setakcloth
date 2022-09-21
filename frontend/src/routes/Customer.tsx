import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/user/customer/CtmHome';

const Customer = () => {
  return (
    <Routes>
      <Route path="customer/" element={<Home />} />
    </Routes>
  );
};

export default Customer;
