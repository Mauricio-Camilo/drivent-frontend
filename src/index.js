import React from 'react';
import ReactDOM from 'react-dom';
// import { StrictMode } from 'react';
// import { createRoot }  from 'react-dom/client';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';

import './assets/styles/reset.css';
import './assets/styles/style.css';

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );
