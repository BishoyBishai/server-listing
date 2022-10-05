import { Server } from "../../models/server";
import List from "../ui/List";
import ServerElement from "./ServerElement";

interface SeversListProps {
  data: Server[];
}
function SeversList({ data }: SeversListProps) {
  return (
    <List
      lazyList
      displayOptionLimit={5}
      data-testid="home-server-list"
      className="flex mt-2 flex-wrap justify-center w-full shadow"
      data={data}
      optionContainerClassNames="flex mt-16 p-4 flex-wrap w-full shadow"
      optionClassNames="p-4 m-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 md:w-5/12 lg:w-3/12"
      orderKeys={["name", "distance"]}
      renderComponent={({ data }) => {
        return <ServerElement {...data} />;
      }}
    ></List>
  );
}

export default SeversList;
