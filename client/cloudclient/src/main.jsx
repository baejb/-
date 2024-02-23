import React from 'react'
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx';
import './index.css'
import SettingPage from './pages/SettingPage.jsx';
import Oauth from './components/Login/Oauth.jsx';
import HomePage from './pages/HomePage.jsx';
import Board from './components/Home/Board.jsx';
import EditPage from './pages/EditPage.jsx';
import UpgradePage from './pages/UpgradePage.jsx';
import BookmarkPage from './pages/BookmarkPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/setting/:id",
    element: <SettingPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/oauth",
    element: <Oauth/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/home/:id",
    element : <HomePage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/board/:id",
    element: <Board />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/edit/:id",
    element: <EditPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/upgrade/:id",
    element: <UpgradePage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/bookmark/:id",
    element: <BookmarkPage/>,
    errorElement: <ErrorPage/>,
  },


]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
)
