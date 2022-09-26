import customAxios from "../utils/api";
import { useQuery } from "react-query";
import { Server } from "../models/server";

const { BASE_URL } = process.env;

const getServersAPI = async () =>
  await customAxios.get<Server[]>(`${BASE_URL}/servers`);

export const useGetServers = () => {
  return useQuery(["servers"], () => getServersAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
  });
};
