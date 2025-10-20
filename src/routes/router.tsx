import { createBrowserRouter } from 'react-router'
import DashboardLayout from '../pages/layouts/dashboard-layout'
import { Dashboard } from '../pages/dashboard'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
])
