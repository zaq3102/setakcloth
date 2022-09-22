import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import Customer from './routes/Customer';
import Ceo from './routes/Ceo';
import User from './routes/User';

const App = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/*" element={<User />} />
        <Route path="/customer/*" element={<Customer />} />
        <Route path="/ceo/*" element={<Ceo />} />
      </Route>
    </Routes>
  );
};

export default App;
