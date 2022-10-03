import { forwardRef } from "react";
import { Server } from "../../models/server";
import List from "../ui/List";
import ServerElement from "./ServerElement";

interface SeversListProps {
  data: Server[];
}
function SeversList({ data }: SeversListProps) {
  return (
    <List
      data-testid="home-server-list"
      className="flex mt-2 flex-wrap justify-center w-full shadow"
      data={data}
      optionContainerClassNames="flex mt-16 p-4 flex-wrap w-full shadow"
      orderKeys={["name", "distance"]}
      renderComponent={ forwardRef((props, ref) => {
        return <ServerElement {...props} forwardedRef={ref} />;
      });}
    ></List>
  );
}

export default SeversList;
