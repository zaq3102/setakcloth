import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../store/actions/types/types';
import { logoutRequest } from '../../store/actions/services/userService';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const token = Boolean(useSelector((state) => state.user.token));

  const onLogoutHandler = () => {
    logoutRequest();
    dispatch({
      type: LOGOUT
    });
  };

  return (
    <div className="Header">
      {token ? (
        <Link to="/" onClick={onLogoutHandler}>
          logout
        </Link>
      ) : (
        <div>
          <Link to="/login" className="Header-Login">
            login
          </Link>
          <Link to="/signup">signup</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
