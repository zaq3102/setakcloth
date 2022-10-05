import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
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
              <Button
                size="small"
                color="color1"
                variant="outlined"
                disableElevation
                onClick={onLogoutHandler}>
                Logout
              </Button>
            </Link>
            <span>&nbsp;&nbsp;</span>
            {loginType === 0 ? (
              <Link to="/customer/mypage">
                <Button
                  size="small"
                  color="color1"
                  variant="contained"
                  disableElevation>
                  My Page
                </Button>
              </Link>
            ) : (
              <Link to="/ceo/mypage">
                <Button
                  size="small"
                  color="color1"
                  variant="contained"
                  disableElevation>
                  My Page
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div>
            <Link to="/login" className="Login-Button">
              <Button
                disableElevation
                size="small"
                color="color1"
                variant="outlined">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                disableElevation
                size="small"
                color="color1"
                variant="contained">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
