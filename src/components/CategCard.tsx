// import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
// import axios from "axios";

const CategCard = ({
  id,
  title,
  onDelete,
}: {
  id: string;
  title: string;
  onDelete: () => void
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-6 py-2 border border-primary rounded-xl shadow-md w-[250px]">
      <div className=" text-lg font-bold mb-2 center mx-auto">{title}</div>
      <div className="flex justify-between gap-3">
        <Button
          className="rounded-md flex-1 text-md"
          title="Edit"
          onClick={() => {
            navigate(`/categories/edit/${id}`);
          }}
        />
        <Button
          className="rounded-md bg-red-700 text-white flex-1 text-md"
          title="Delete"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default CategCard;
