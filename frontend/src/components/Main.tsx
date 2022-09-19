import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './layout/Header';

const Main: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
