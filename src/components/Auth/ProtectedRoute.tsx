import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  redirectTo: string;
  children: JSX.Element;
}

function ProtectedRoute({ children, redirectTo }: ProtectedRouteProps) {
  const token = null; // we make check if we have token

  const location = useLocation();

  if (!token) {
    // If we don't have valid Token we are going to navigate to login page as default option or to redirectTo prop
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  return children;
}

ProtectedRoute.defaultProps = {
  redirectTo: "/login",
};

export default ProtectedRoute;
