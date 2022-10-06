import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Drawer, List, ListItem } from '@mui/material';
import { LOGOUT } from '../../store/actions/types/types';
import { logoutRequest } from '../../store/actions/services/userService';
import Logo from './Logo';
import { Box } from '@mui/system';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const token = Boolean(useSelector((state) => state.user.token));
  const loginType = useSelector((state) => state.user.loginType);
  const linkTO = ['/customer', '/ceo'];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    logoutRequest();
    dispatch({
      type: LOGOUT
    });
    navigate('/');
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
        <Box className="headermenu-topbox">
          <img
            className="drawer-back"
            src="https://setakcloth.s3.ap-northeast-2.amazonaws.com/left-arrow.png"
            alt="menu"
            onClick={() => setIsDrawerOpen(false)}
          />
        </Box>
        <List sx={{ width: 220 }}>
          {token ? (
            <>
              <ListItem>
                <Link to="/">
                  <div
                    className="Header-drawer-listitem"
                    onClick={() => onLogoutHandler}>
                    Logout
                  </div>
                </Link>
              </ListItem>
              {loginType === 0 ? (
                <>
                  <Divider />
                  <ListItem>
                    <Link to="/customer/mypage">
                      <div
                        onClick={() => setIsDrawerOpen(false)}
                        className="Header-drawer-listitem">
                        My Page
                      </div>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/customer/orderlist">
                      <div
                        onClick={() => setIsDrawerOpen(false)}
                        className="Header-drawer-listitem">
                        나의 주문 목록
                      </div>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/customer/reviewlist">
                      <div
                        onClick={() => setIsDrawerOpen(false)}
                        className="Header-drawer-listitem">
                        나의 리뷰
                      </div>
                    </Link>
                  </ListItem>
                </>
              ) : (
                <ListItem>
                  <Link to="/ceo/mypage">
                    <div
                      onClick={() => setIsDrawerOpen(false)}
                      className="Header-drawer-listitem">
                      My Page
                    </div>
                  </Link>
                </ListItem>
              )}
            </>
          ) : (
            <>
              <ListItem>
                <Link to="/login" className="Login-Button">
                  <div
                    onClick={() => setIsDrawerOpen(false)}
                    className="Header-drawer-listitem">
                    Log in
                  </div>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/signup">
                  <div
                    onClick={() => setIsDrawerOpen(false)}
                    className="Header-drawer-listitem">
                    Sign Up
                  </div>
                </Link>
              </ListItem>
              <Divider />
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
