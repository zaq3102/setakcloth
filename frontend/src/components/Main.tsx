import * as React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalFont from '../styles/fonts/GlobalFont';
import Globalstyle from '../styles/fonts/Globalstyle';
import Header from './layout/Header';
import Footer from './layout/Footer';

const Main: React.FC = () => {
  return (
    <div className="setak-wrap">
      <div className="setak-content-wrap">
        <Globalstyle />
        <GlobalFont />
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
