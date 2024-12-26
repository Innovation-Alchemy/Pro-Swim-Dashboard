import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AdminSelect = ({
  label,
  options,
  selected,
  handleSelection,
  errorText,
}: {
  label: string;
  options: { id: number; title: string }[];
  selected: number;
  handleSelection: (id: number) => void;
  errorText?: string;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative w-full mb-3">
      <div className="text-primary font-semibold text-lg mb-2">{label}</div>
      <div
        className="w-full border-2 border-primary rounded-2xl py-3 px-2 text-primary font-semibold flex justify-between items-center cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="select-none">
          {selected != -1
            ? options.find((option) => option.id == selected)?.title
            : "Select option"}
        </div>
        <FontAwesomeIcon icon={isDropdownOpen ? faCaretUp : faCaretDown} />
      </div>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-2 border-primary rounded-xl z-10 mt-2">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex items-center p-2 hover:bg-secondary first:rounded-t-xl last:rounded-b-xl text-primary font-semibold"
              onClick={() => {
                handleSelection(option.id);
                setIsDropdownOpen(false);
              }}
            >
              <input
                type="radio"
                name="singleSelect"
                checked={selected === option.id}
                onChange={() => {
                  handleSelection(option.id);
                  setIsDropdownOpen(false);
                }}
                className="mr-2"
              />
              <label>{option.title}</label>
            </div>
          ))}
        </div>
      )}
      {errorText && <div className="text-red-600 ">{errorText}</div>}
    </div>
  );
};

export default AdminSelect;
