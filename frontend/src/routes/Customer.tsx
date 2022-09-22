import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/user/customer/CtmHome';
import LaundryList from '../components/user/customer/CtmLaundryList';
import LaundryDetail from '../components/user/customer/CtmLaundryDetail';

const Customer = () => {
  return (
    <Routes>
      <Route path="customer/" element={<Home />} />
      <Route path="customer/laundrylist" element={<LaundryList />} />
      <Route path="customer/:laundryId" element={<LaundryDetail />} />
    </Routes>
  );
};

export default Customer;
