import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import CtmMypage from '../components/user/customer/CtmMypage';
import Home from '../components/user/customer/CtmHome';
import LaundryDetail from '../components/user/customer/CtmLaundryDetail';
import OrderDetail from '../components/user/customer/CtmOrderDetail';
import OrderList from '../components/user/customer/CtmOrderList';
import ReviewList from '../components/user/customer/CtmReviewList';
import NotFound from '../components/error/NotFound';
import '../styles/Customer.scss';

const Customer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:laundryId" element={<LaundryDetail />} />
      <Route path="/mypage" element={<CtmMypage />} />
      <Route path="/order/:orderId" element={<OrderDetail />} />
      <Route path="/orderlist" element={<OrderList />} />
      <Route path="/reviewlist" element={<ReviewList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Customer;
