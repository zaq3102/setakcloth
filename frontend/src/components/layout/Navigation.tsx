import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const token = Boolean(useSelector((state) => state.user.token));
  const loginType = useSelector((state) => state.user.loginType);

  return (
    <div className="Navigation">
      {token ? (
        loginType === 0 ? (
          <Link to="/customer">
            <img className="logo" src="../assets/logo.png" alt="" />
            세탁 CLOTH
          </Link>
        ) : (
          <Link to="/ceo">
            <img className="logo" src="../assets/logo.png" alt="" />
            세탁 CLOTH
          </Link>
        )
      ) : (
        <Link to="/">
          <img className="logo" src="../assets/logo.png" alt="" />
          세탁 CLOTH
        </Link>
      )}
    </div>
  );
};

export default Navigation;
