import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessSessionToken } from "../utils/token";

export default function useIsAuth() {
  const navigate = useNavigate();
  return useCallback(() => {
    const token = getAccessSessionToken();
    if (token) navigate("/");
  }, [navigate]);
}
