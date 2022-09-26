import { Server } from "../../models/server";
import ServerElement from "./ServerElement";

interface SeversListProps {
  data: Server[];
}
function SeversList({ data }: SeversListProps) {
  return (
    <div
      data-testid="home-server-list"
      className="flex mt-14 flex-wrap justify-center w-full shadow"
    >
      {data.map((s) => (
        <ServerElement {...s} key={s.name} />
      ))}
    </div>
  );
}

export default SeversList;
