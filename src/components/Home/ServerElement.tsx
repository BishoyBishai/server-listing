interface ServerElementProps {
  distance: number;
  name: string;
}
const ServerElement = ({ name, distance }: ServerElementProps) => (
  <div className="p-4 m-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 md:w-5/12 lg:w-3/12">
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

export default ServerElement;
