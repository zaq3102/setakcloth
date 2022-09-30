import * as React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalFont from '../styles/fonts/GlobalFont';
import Globalstyle from '../styles/fonts/Globalstyle';
import Header from './layout/Header';

const Main: React.FC = () => {
  return (
    <div>
      <Globalstyle />
      <GlobalFont />
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
