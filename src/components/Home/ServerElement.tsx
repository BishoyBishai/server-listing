import { HTMLProps } from "react";

interface ServerElementProps extends HTMLProps<HTMLDivElement> {
  distance: number;
  name: string;
}
const ServerElement = ({ name, distance, ...props }: ServerElementProps) => {
  return (
    <div {...props}>
      <div className="mb-4">
        <div className="mb-2 text-xl font-bold  text-gray-900 dark:text-white ">
          {name}
        </div>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        distance: {distance}
      </div>
    </div>
  );
};

export default ServerElement;
