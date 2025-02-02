import React from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Root from './routes/root'
import Login from './routes/login';
import Courses from './routes/courses';
import Error from './routes/error';
import Schedule from './routes/schedule';
import Registration from './routes/registration';
import { GlobalStateProvider } from './functions/globalState';
import RegisterStatus from './routes/registerstatus';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/*",
        element: <Error />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/registration",
        element: <Registration />
      },
      {
        path: "/registerstatus",
        element: <RegisterStatus />
      },
    ],
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalStateProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GlobalStateProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();