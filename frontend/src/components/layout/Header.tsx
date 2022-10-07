import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, colors } from '@mui/material';
import { LOGOUT } from '../../store/actions/types/types';
import { logoutRequest } from '../../store/actions/services/userService';
import Logo from './Logo';
import Swal from 'sweetalert2';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const token = Boolean(useSelector((state) => state.user.token));
  const loginType = useSelector((state) => state.user.loginType);
  const linkTO = ['/customer', '/ceo'];
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    Swal.fire({
      width: 400,
      icon: 'question',
      text: '정말 로그아웃 하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#1e3e5c',
      cancelButtonColor: '#ff5a5a'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
        logoutRequest();
        dispatch({
          type: LOGOUT
        });
      }
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
            {/* <Link to="/"> */}
            <Button
              size="small"
              color="color1"
              variant="outlined"
              disableElevation
              onClick={onLogoutHandler}>
              Logout
            </Button>
            {/* </Link> */}
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
