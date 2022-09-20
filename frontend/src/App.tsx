import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import Ceo from './routes/Ceo';
import User from './routes/User';

const App = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/ceo/*" element={<Ceo />} />
      </Route>
    </Routes>
  );
};

export default App;
