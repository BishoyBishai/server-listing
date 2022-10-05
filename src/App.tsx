import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Loading from "./components/ui/Loading";
const Home = lazy(() => import(/*webpackChunkName: "home" */ "./pages/home"));
const Login = lazy(
  () => import(/*webpackChunkName: "login" */ "./pages/login")
);
export const App = () => {
  return (
    <div className="p-0 m-0">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};
