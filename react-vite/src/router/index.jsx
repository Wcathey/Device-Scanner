import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage';
import AllDevices from '../components/DevicePage/AllDevices';
import SettingsPage from '../components/SettingsPage';
import CapturesPage from '../components/CapturesPage';
import CaptureDetailsPage from '../components/CaptureDetailsPage';
import Camera from '../components/Camera';
import Layout from './Layout';


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
        element: <CapturesPage />,
      },
      {
        path:"/captures/scan",
        element: <Camera />,
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
