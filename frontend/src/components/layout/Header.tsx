import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Fade, Menu, MenuItem } from '@mui/material';
import { LOGOUT } from '../../store/actions/types/types';
import { logoutRequest } from '../../store/actions/services/userService';
import Logo from './Logo';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const token = Boolean(useSelector((state) => state.user.token));
  const loginType = useSelector((state) => state.user.loginType);
  const linkTO = ['/customer', '/ceo'];

  const onLogoutHandler = () => {
    logoutRequest();
    dispatch({
      type: LOGOUT
    });
  };

  return (
    <div className="Header">
      <div className="Logo-Space">
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

      <div className="Login-Space">
        {token ? (
          <div>
            <Link to="/">
              <Button onClick={onLogoutHandler}>Logout</Button>
            </Link>
            {loginType === 0 ? (
              <Link to="/customer/mypage">
                <Button>My Page</Button>
              </Link>
            ) : (
              <Link to="/ceo/mypage">
                <Button>My Page</Button>
              </Link>
            )}
          </div>
        ) : (
          <div>
            <Link to="/login" className="Login-Button">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
