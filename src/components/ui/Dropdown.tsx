import { Arrow } from "./icons";
import { useCallback, useState } from "react";

interface DropdownOption {
  key: string;
  DisplayText: string;
}
interface DropdownProps {
  text: string;
  options: DropdownOption[];
  onSelect?: (key: string) => void;
}
function Dropdown({ text, options, onSelect }: DropdownProps) {
  const [isOpen, toggleOpen] = useState(false);

  const handleToggle = useCallback(() => {
    toggleOpen(!isOpen);
  }, [isOpen]);

  const handleOnSelect = useCallback(
    (key: string) => () => {
      onSelect && onSelect(key);
    },
    [onSelect]
  );

  return (
    <div className="inline-flex relative bg-white dark:bg-midnight-500 dark:text-white border rounded-md">
      <button onClick={handleToggle} className="px-4 py-2 text-sm rounded-l-md">
        {text}
      </button>

      <div>
        <button
          type="button"
          onClick={handleToggle}
          className={`
          inline-flex items-center justify-center h-full px-2 dark:bg-midnight-500 dark:text-white border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50`}
        >
          <Arrow />
        </button>

        <div
          className={`${
            isOpen ? "" : "hidden"
          }  absolute left-0 z-10 w-56 mt-2 origin-top-right bg-white dark:bg-midnight-500 dark:text-white border border-gray-100 rounded-md shadow-lg`}
        >
          <div className="p-2">
            {options.map((option) => (
              <button
                onClick={handleOnSelect(option.key)}
                key={option.key}
                className="flex justify-start w-full  px-4 py-2 text-sm rounded-lg hover:bg-gray-50 hover:text-gray-700"
              >
                {option.DisplayText}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
