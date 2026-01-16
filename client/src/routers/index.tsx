import { createBrowserRouter } from "react-router-dom";

// pages
import Index from "../pages/Index";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/leads";
import LeadDetails from "../pages/leadDetails";

//
import ProtectedRoute from "../components/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/leads",
    element: (
      <ProtectedRoute>
        <Leads />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/leads/:id",
    element: (
      <ProtectedRoute>
        <LeadDetails />,
      </ProtectedRoute>
    ),
  },
]);

export default routes;
