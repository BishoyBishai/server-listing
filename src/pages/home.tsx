import HomeSkeleton from "../components/Home/HomeSkeleton";
import ServerElement from "../components/Home/ServerElement";
import Nav from "../components/Nav/Nav";
import { useGetServers } from "../hooks/useGetServers";

export default function Home() {
  const { data, isLoading } = useGetServers();
  return (
    <div>
      <Nav />
      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <div className="flex mt-16 flex-wrap justify-center w-full shadow">
          {data?.data.map((s) => (
            <ServerElement {...s} key={s.name} />
          ))}
        </div>
      )}
    </div>
  );
}
