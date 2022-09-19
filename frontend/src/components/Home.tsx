import * as React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <div>홈페이지 입니다.</div>
      <Link to="/user/login">login</Link>
      <Link to="/user/signup">signup</Link>
    </>
  );
};

export default Home;
