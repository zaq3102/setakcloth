import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import CtmMypage from '../components/user/customer/CtmMypage';
import Home from '../components/user/customer/CtmHome';
import LaundryList from '../components/user/customer/CtmLaundryList';
import LaundryDetail from '../components/user/customer/CtmLaundryDetail';
import OrderDetail from '../components/user/customer/CtmOrderDetail';
import '../styles/Customer.scss';

const Customer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/laundrylist" element={<LaundryList />} />
      <Route path="/:laundryId" element={<LaundryDetail />} />
      <Route path="/mypage" element={<CtmMypage />} />
      <Route path="/order/:orderId" element={<OrderDetail />} />
    </Routes>
  );
};

export default Customer;
