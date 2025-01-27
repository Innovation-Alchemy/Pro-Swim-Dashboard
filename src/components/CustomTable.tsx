import { useState } from "react";
import Button from "./Button";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomTable = <T,>({
  title,
  headers,
  data,
  limtedBy,
  onLimitedClicked,
  action,
  onRowClick,
}: {
  title?: string;
  headers: { label: string; data: (row: T) => React.ReactNode }[];
  data: unknown[];
  limtedBy?: number;
  onLimitedClicked?: () => void;
  action?: {
    title?: string;
    icon: IconDefinition;
    className: string;
    onClick: (id: string) => void;
  }[];
  onRowClick?: (id: string) => void;
}) => {
  const [allChecked, setAllChecked] = useState(false);

  const [checkedRows, setCheckedRows] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );

  const handleHeaderCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);

    setCheckedRows(new Array(data.length).fill(isChecked));
  };

  const handleRowCheckboxChange = (index: number) => {
    const updatedCheckedRows = [...checkedRows];
    updatedCheckedRows[index] = !updatedCheckedRows[index];
    setCheckedRows(updatedCheckedRows);

    const areAllRowsChecked = updatedCheckedRows.every((row) => row);
    setAllChecked(areAllRowsChecked);
  };

  return (
    <div
      className={`bg-white ${
        title && "p-7"
      } rounded-lg h-full flex flex-col`}
    >
      {title && (
        <div className="text-xl text-primary font-semibold">{title}</div>
      )}
      {/* Add overflow-x:auto for the table wrapper */}
      <div className="overflow-x-auto w-full">
        <table className="w-full rounded-md my-4 border-separate border-spacing-0">
          <thead className="bg-[#edf6ff]">
            <tr>
              {action && (
                <td className="w-[80px] text-center ">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={handleHeaderCheckboxChange}
                  />
                </td>
              )}
              {headers.map((header, index) => (
                <td
                  key={index}
                  className="first:rounded-s-xl last:rounded-e-xl py-2 px-3"
                >
                  {header.label}
                </td>
              ))}
              {action && (
                <td className="first:rounded-s-xl last:rounded-e-xl py-2 px-3">
                  Action
                </td>
              )}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, limtedBy ?? 99999).map((row: any, rowIndex) => (
              <tr key={rowIndex}>
                {action && (
                  <td className="border-b border-gray-400 text-center">
                    <input
                      type="checkbox"
                      checked={checkedRows[rowIndex]}
                      onChange={() => handleRowCheckboxChange(rowIndex)}
                    />
                  </td>
                )}
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="border-b first:pl-4 border-gray-400 py-2 px-3 whitespace-nowrap overflow-x-auto"
                    onClick={() => onRowClick && onRowClick(row)}
                    style={{ maxWidth: "200px" }} // Adjust maxWidth as needed
                  >
                    {header.data(row)}
                  </td>
                ))}
                {action && (
                  <td className="border-b first:pl-4 border-gray-400 py-2 px-3">
                    {action.map((btn, index) => (
                      <FontAwesomeIcon
                        key={index}
                        className={btn.className}
                        icon={btn.icon}
                        onClick={() => {
                          btn.onClick(row);
                        }}
                      />
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {limtedBy && (
        <div className="flex justify-center mt-auto">
          <Button title="Details" onClick={onLimitedClicked!} />
        </div>
      )}
    </div>
  );
};

export default CustomTable;