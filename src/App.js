import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import GlobalStyles from './styles/global';

function App() {
  return (
    <>
      <ToastContainer />
      <GlobalStyles autoClose={3000} />
      <Routes />
    </>
  );
}

export default App;
