import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MainLayout from '@/Layout/MainLayout'
import PrivateRoute from './auth/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import Dashboard from './pages/Dashboard'
import { AuthContextProvider } from './context/authContext'
import PublicRoute from './auth/PublicRoute'
import Notice from './pages/Notice'
import StudyMaterial from './pages/StudyMaterial'
import DashboardLayout from './Layout/DashboardLayout'
import Discussion from './pages/Discussion'
import PYQs from './pages/PYQs'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "dashboard",
            element: <DashboardLayout />,
            children: [
              {
                path: '',
                element: <Dashboard />
              },
              {
                path: 'notice',
                element: <Notice />
              },
              {
                path: 'pyqs',
                element: <PYQs />
              },
              {
                path: 'studyMaterial',
                element: <StudyMaterial />
              },
              {
                path: 'discussion',
                element: <Discussion />
              },
            ]
          }
        ]
      },
      {
        path: "/",
        element: <Home />
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "signup",
            element: <Signup />
          },
          {
            path: "login",
            element: <Login />
          },
        ]
      },
      {
        path: "admin",
        element: "admin"
      },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
)
