import * as React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalFont from '../styles/fonts/GlobalFont';
import Globalstyle from '../styles/fonts/Globalstyle';
import Header from './layout/Header';
import Navigation from './layout/Navigation';

const Main: React.FC = () => {
  return (
    <div>
      <Globalstyle />
      <GlobalFont />
      <Header />
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
