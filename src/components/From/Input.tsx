import { useCallback, useRef, useState } from "react";
import { InputProps } from "../../models/form";

function Input({ error, onBlur, onChange, label, ...props }: InputProps) {
  const [inputValue, setInputValue] = useState(props.value);
  const isDirty = useRef(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange && onChange(e);
    },
    [onChange]
  );

  const handleInputBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { value } = e.target;
      isDirty.current = true;

      setInputValue(value);
      onBlur && onBlur(e);
    },
    [onBlur]
  );

  return (
    <div className="w-full">
      {label && (
        <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {label}
        </div>
      )}
      <input
        {...props}
        value={inputValue}
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
          isDirty.current && error && "border-red-500"
        }`}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      {error && isDirty.current && (
        <p className="text-red-500 text-xs italic">{error}</p>
      )}
    </div>
  );
}

export default Input;
