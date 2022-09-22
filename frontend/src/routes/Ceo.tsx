import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import CeoOrderDetail from '../components/user/ceo/CeoOrderDetail';
import CeoHome from '../components/user/ceo/CeoHome';
import CeoMypage from '../components/user/ceo/CeoMypage';
import '../styles/Ceo.scss';

const Ceo = () => {
  return (
    <Routes>
      <Route path="/" element={<CeoHome />} />
      <Route path="/:orderNum" element={<CeoOrderDetail />} />
      <Route path="/mypage" element={<CeoMypage />} />
    </Routes>
  );
};

export default Ceo;
