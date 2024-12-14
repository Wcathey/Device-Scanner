import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage';
import DevicePage from '../components/DevicePage';
import SettingsPage from '../components/SettingsPage';
import CapturesPage from '../components/CapturesPage';
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
        path: "/devices",
        element: <DevicePage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />

      }
    ],
  },

]);
