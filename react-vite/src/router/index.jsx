import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage';
import AllDevices from '../components/DevicePage/AllDevices';
import CapturesDirectory from '../components/CapturesPage';
import Camera from '../components/Camera';
import Layout from './Layout';
import TagFoldersPage from '../components/TagFoldersPage';
import TagFolderContents from '../components/TagFolderContents';
import Scanner from '../components/Camera/Scanner';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path:"/captures",
        element: <CapturesDirectory />,
      },
      {
        path:"/captures/scan",
        element: <Camera />,
      },
      {
        path: "/captures/document",
        element: <Scanner/>
      },

      {
        path: "/tags",
        element: <TagFoldersPage />,
      },
      {
        path: "/tags/:name",
        element: <Outlet/>,
        children: [
          {
            index: true,
            element: <TagFolderContents/>
          }
        ]
      },
      {
        path: "/devices",
        element: <AllDevices />,
      },
    ],
  },

]);
