import * as React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <div className="Navigation">
      <Link to="/">
        <img className="logo" src="../assets/logo.png" alt="" />
        세탁 CLOTH
      </Link>
    </div>
  );
};

export default Navigation;
