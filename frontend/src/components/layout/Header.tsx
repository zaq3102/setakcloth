import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Drawer, IconButton, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import { LOGOUT } from '../../store/actions/types/types';
import { logoutRequest } from '../../store/actions/services/userService';
import Logo from './Logo';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const token = Boolean(useSelector((state) => state.user.token));
  const loginType = useSelector((state) => state.user.loginType);
  const linkTO = ['/customer', '/ceo'];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
          <Link to={linkTO[loginType]} className="Header-logo">
            <Logo />
          </Link>
        ) : (
          <Link to="/" className="Header-logo">
            <Logo />
          </Link>
        )}
      </div>
      <img
        className="header-menu"
        src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/menu.png"
        alt="menu"
        onClick={() => setIsDrawerOpen(true)}
      />
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}>
        <List sx={{ width: 220 }}>
          {token ? (
            <>
              <ListItem>
                <Link to="/">
                  <div
                    className="Header-drawer-listitem"
                    onClick={onLogoutHandler}>
                    Logout
                  </div>
                </Link>
              </ListItem>
              {loginType === 0 ? (
                <ListItem>
                  <Link to="/customer/mypage">
                    <div className="Header-drawer-listitem">My Page</div>
                  </Link>
                </ListItem>
              ) : (
                <ListItem>
                  <Link to="/ceo/mypage">
                    <div className="Header-drawer-listitem">My Page</div>
                  </Link>
                </ListItem>
              )}
              ):(
            </>
          ) : (
            <>
              <ListItem>
                <Link to="/login" className="Login-Button">
                  <div className="Header-drawer-listitem">Log in</div>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/signup">
                  <div className="Header-drawer-listitem">Sign Up</div>
                </Link>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
