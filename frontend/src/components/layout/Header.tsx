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
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  const onLogoutHandler = () => {
    logoutRequest();
    dispatch({
      type: LOGOUT
    });
  };

  const profileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const profileClose = () => {
    setAnchor(null);
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
        <Button
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={profileClick}>
          <img
            className="Profile-Img"
            src="./assets/profile.png"
            alt="profile"
          />
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button'
          }}
          anchorEl={anchor}
          open={open}
          onClose={profileClose}
          TransitionComponent={Fade}>
          {token ? (
            <div>
              <MenuItem onclick={onLogoutHandler}>Logout</MenuItem>
              {loginType === 0 ? (
                <Link to="/customer/mypage">
                  <MenuItem onClick={profileClose}>My Page</MenuItem>
                </Link>
              ) : (
                <Link to="/ceo/mypage">
                  <MenuItem onClick={profileClose}>My Page</MenuItem>
                </Link>
              )}
            </div>
          ) : (
            <div>
              <Link to="/login" className="Login-Button">
                <MenuItem onClick={profileClose}>Login</MenuItem>
              </Link>
              <Link to="/signup">
                <MenuItem onClick={profileClose}>Sign Up</MenuItem>
              </Link>
            </div>
          )}{' '}
        </Menu>
      </div>
    </div>
  );
};

export default Header;
