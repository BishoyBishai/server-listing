import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { clearSessionToken } from "../utils/token";

export default function useLogout() {
  const navigate = useNavigate();
  return useCallback(() => {
    navigate("/");
    clearSessionToken();
  }, [navigate]);
}
