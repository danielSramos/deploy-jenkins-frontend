type Option = {
  value: string;
  label: string;
};

type RadioButtonProps = {
  options: Option[];
  name: string;
  selected: string[];
  onChange: (value: string[]) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  name,
  selected,
  onChange,
}) => {
  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-8 mb-10">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center cursor-pointer space-x-2"
        >
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={selected.includes(option.value)}
            onChange={() => handleSelect(option.value)}
            className="hidden"
          />
          <div
            className={`w-5 h-5 border-2 border-gray-500 rounded-md flex items-center justify-center transition-all ${
              selected.includes(option.value)
                ? "border-blue-500 bg-blue-100"
                : ""
            }`}
          >
            {selected.includes(option.value) && (
              <div className="w-5 h-5 bg-blue-500 rounded-md border-blue-500"></div>
            )}
          </div>
          <span className="text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
