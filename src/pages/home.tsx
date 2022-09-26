import HomeSkeleton from "../components/Home/HomeSkeleton";
import SeversList from "../components/Home/SeversList";
import Nav from "../components/Nav/Nav";
import { useGetServers } from "../hooks/useGetServers";

export default function Home() {
  const { data, isLoading } = useGetServers();
  return (
    <div>
      <Nav />
      {isLoading ? <HomeSkeleton /> : <SeversList data={data?.data || []} />}
    </div>
  );
}
