import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import customAxios from "../utils/api";
import { setSessionToken } from "../utils/token";

const { BASE_URL } = process.env;

export interface LoginRequestBody {
  username: string;
  password: string;
}

export const loginAPI = async (data: LoginRequestBody) => {
  return await customAxios({
    url: `${BASE_URL}/tokens`,
    method: "post",
    data,
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
