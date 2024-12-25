import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage';
import AllDevices from '../components/DevicePage/AllDevices';
import SettingsPage from '../components/SettingsPage';
import CapturesDirectory from '../components/CapturesPage';
import CaptureDetailsPage from '../components/CaptureDetailsPage';
import Camera from '../components/Camera';
import Layout from './Layout';
import TagFoldersPage from '../components/TagFoldersPage';
import TagFolderContents from '../components/TagFolderContents';


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
        path: "/captures/tags/"
      },
      {
        path: "/captures/:captureId",
        element: <Outlet/>,
        children: [
          {
            index: true,
            element: <CaptureDetailsPage/>
          }
        ]

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
      {
        path: "/settings",
        element: <SettingsPage />

      }
    ],
  },

]);
