import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
// import axios from "axios";

const ProductCard = ({
  id,
  images,
  brand,
  title,
  price,
  onDelete,
}: {
  id: string;
  images: {
    generic: string[]; // array of generic image URLs
    colored: { color: string; images: string[] }[]; // array of colored objects with images
  };
  brand: string;
  title: string;
  price: string;
  onDelete: () => void
}) => {
  const lastImages = [
    ...images.generic, // Spread generic images
    ...images.colored.flatMap((color) => color.images), // Flatten colored images array
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();



  return (
    <div className="flex flex-col px-6 py-2 border border-primary rounded-xl shadow-md w-[250px]">
      <div className="w-full mb-3">
        <img
          src={
            process.env.REACT_APP_BASE_URL +
            "uploads/" +
            lastImages[selectedImageIndex]
          }
          alt="Product 1"
          width={175}
          height={175}
          className="m-auto w-[175px] h-[175px] object-cover"
        />
        <div
          className={`flex mt-2 h-[40px] ${lastImages.length < 4 && "justify-center"
            } overflow-x-auto w-full`}
        >
          {lastImages.map((img, index) => (
            <img
              key={index}
              onClick={() => {
                setSelectedImageIndex(index);
              }}
              width={40}
              src={process.env.REACT_APP_BASE_URL + "uploads/" + img}
              className={`border-b-2 w-[40px] h-[39px] object-cover ${selectedImageIndex == index ? "border-primary" : ""
                }`}
            />
          ))}
        </div>
      </div>
      <div className="text-gray-700 text-md mb-2">{brand}</div>
      <div className=" text-md font-bold mb-2">{title}</div>
      <div className="text-md font-semibold text-gray-800 mb-4">{price}</div>
      <div className="flex justify-between gap-3">
        <Button
          className="rounded-md flex-1"
          title="Edit"
          onClick={() => {
            navigate(`/products/edit/${id}`);
          }}
        />
        <Button
          className="rounded-md bg-red-700 text-white flex-1"
          title="Delete"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default ProductCard;
