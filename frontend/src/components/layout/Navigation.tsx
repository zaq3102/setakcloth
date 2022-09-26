import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navigation: React.FC = () => {
  const token = Boolean(useSelector((state) => state.user.token));
  const loginType = useSelector((state) => state.user.loginType);
  const linkTO = ['/customer', '/ceo'];

  return (
    <div className="Navigation">
      {token ? (
        <Link to={linkTO[loginType]} className="logo">
          <Logo />
        </Link>
      ) : (
        <Link to="/" className="logo">
          <Logo />
        </Link>
      )}
    </div>
  );
};

export default Navigation;
