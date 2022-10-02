import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Main';
import Customer from './routes/Customer';
import Ceo from './routes/Ceo';
import User from './routes/User';
import ServerError from './components/error/ServerError';
import NotFound from './components/error/NotFound';
import NotAllowed from './components/error/NotAllowed';

const App = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/*" element={<User />} />
        <Route path="/customer/*" element={<Customer />} />
        <Route path="/ceo/*" element={<Ceo />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/banned" element={<NotAllowed />} />
        <Route path="/error" element={<ServerError />} />
      </Route>
    </Routes>
  );
};

export default App;
