import withErrorBoundaryCheck from "../components/Error/ErrorBoundary";
import LoginForm from "../components/Login/LoginForm";

function login() {
  return <LoginForm />;
}

export default withErrorBoundaryCheck(login);
