import { render } from 'react-dom';
import React from 'react'
import App from './components/App.jsx';
import {BrowserRouter} from 'react-router-dom';


// const rootElement = document.getElementById('app');
// const root = createRoot(rootElement);

// // 👇️ wrap App in Router
// root.render(
//     <Router>
//       <App />
//     </Router>
// );

render(
  <BrowserRouter>
    <App />,
  </BrowserRouter>,
  document.getElementById('app'),
);
