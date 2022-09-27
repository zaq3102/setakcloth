import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../../store/actions/types/types';
import { logoutRequest } from '../../store/actions/services/userService';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const token = Boolean(useSelector((state) => state.user.token));
  const loginType = useSelector((state) => state.user.loginType);

  const onLogoutHandler = () => {
    logoutRequest();
    dispatch({
      type: LOGOUT
    });
  };

  return (
    <div className="Header">
      {token ? (
        <div>
          <Link to="/" onClick={onLogoutHandler}>
            logout
          </Link>{' '}
          {loginType === 0 ? (
            <Link to="/customer/mypage">mypage</Link>
          ) : (
            <Link to="/ceo/mypage">mypage</Link>
          )}
        </div>
      ) : (
        <div>
          <Link to="/login" className="Header-Left">
            login
          </Link>
          <Link to="/signup">signup</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
