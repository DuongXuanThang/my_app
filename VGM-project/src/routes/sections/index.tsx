import { Navigate, useRoutes } from 'react-router-dom';
import {dashboardRoutes} from './dashboard'
import { paths } from '../path';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={paths.dashboard.root} replace />,
    },
    //dashboard router
    ...dashboardRoutes
])
}
