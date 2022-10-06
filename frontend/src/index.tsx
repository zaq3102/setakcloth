import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';
import { ThemeProvider } from '@mui/material';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import promiseMiddlerware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import theme from './styles/Palette';
import rootReducer from './store/reducers';
import '../public/assets/logo.png';
import '../public/favicon.ico';
// import '../public/assets/Fonts/NanumGothic.woff';
// import '../public/assets/Fonts/NanumGothicBold.woff';
// import '../public/assets/Fonts/NanumGothicExtraBold.woff';
// import '../public/assets/Fonts/NanumGothicLight.woff';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [promiseMiddlerware, reduxThunk]
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default store;
