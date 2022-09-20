import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import CeoOrderDetail from '../components/user/ceo/CeoOrderDetail';
import CeoHome from '../components/user/ceo/CeoHome';
import '../styles/Ceo.scss';

const Ceo = () => {
  return (
    <Routes>
      <Route path="/" element={<CeoHome />} />
      <Route path="/:orderNum" element={<CeoOrderDetail />} />
    </Routes>
  );
};

export default Ceo;
