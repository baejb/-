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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/setting/:userId",
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
    element : <HomePage/>
  },
  {
    path: "/board/:id",
    element: <Board />
  },



  // {
  //   path: "contacts/:contactId",
  //   element: <Contact />,
  // }, 이런식으로 주소랑, 컴포넌트 적기 , 추가적으로 뒤에 id가 붙거나 하는건 children으로 관리 
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
)
