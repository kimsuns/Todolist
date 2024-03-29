/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import worker from './mock/browser';

// worker.start();

async function prepare() {
  await worker.start();

  return Promise.resolve();
}

prepare().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
});
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );
