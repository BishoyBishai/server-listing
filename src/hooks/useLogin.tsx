import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { setSessionToken } from "../utils/token";

const { BASE_URL } = process.env;

export interface LoginRequestBody {
  username: string;
  password: string;
}

export const loginAPI = async (data: LoginRequestBody) => {
  const headers = {
    "Content-Type": "application/json",
  };

  axios.defaults.proxy = {
    host: BASE_URL as string,
    port: 80,
    protocol: "https",
  };

  return await axios({
    url: `${BASE_URL}/tokens`,
    method: "post",
    data,
    headers,
  });
};
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation(
    ["login"],
    (credential: LoginRequestBody) => loginAPI(credential),
    {
      retry: false,
      onSuccess: (loginResponse) => {
        const token = loginResponse.data.token;
        setSessionToken(token);
        navigate("/");
      },
    }
  );
};
