import customAxios from "../utils/api";
import { useQuery } from "react-query";

const { BASE_URL } = process.env;

const getServersAPI = async () =>
  await customAxios.get<
    {
      name: string;
      distance: number;
    }[]
  >(`${BASE_URL}/servers`);

export const useGetServers = () => {
  return useQuery(["servers"], () => getServersAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
  });
};
