import HomeSkeleton from "../components/Home/HomeSkeleton";
import ServerElement from "../components/Home/ServerElement";
import { useGetServers } from "../hooks/useGetServers";

export default function Home() {
  const { data, isLoading } = useGetServers();
  if (isLoading) return <HomeSkeleton />;
  return (
    <div className="flex flex-wrap justify-center w-full rounded border shadow  dark:divide-gray-700 md:p-6 dark:border-gray-700">
      {data?.data.map((s) => (
        <ServerElement {...s} key={s.name} />
      ))}
    </div>
  );
}
