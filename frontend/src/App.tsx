import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import Customer from './routes/Customer';
import User from './routes/User';

const App = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/*" element={<Customer />} />
      </Route>
    </Routes>
  );
};

export default App;
