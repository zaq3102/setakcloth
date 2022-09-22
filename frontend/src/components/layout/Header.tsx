import * as React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div className="Header">
      <div>
        <Link to="/login">login</Link>
        <Link to="/signup">signup</Link>
      </div>
    </div>
  );
};

export default Header;
