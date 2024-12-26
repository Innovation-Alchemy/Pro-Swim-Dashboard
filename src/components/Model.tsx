import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faMinus } from "@fortawesome/free-solid-svg-icons";
import AdminInput from "./AdminInput";
import Button from "./Button";

const Model = ({
  id,
  img,
  onRemove,
  title,
  color,
  handleTitle,
  handleColor,
  handleImg,
}: {
  id: number;
  img: string | null;
  onRemove: () => void;
  title: string;
  color: string;
  handleTitle: (s: string) => void;
  handleColor: (s: string) => void;
  handleImg: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div
      className="relative w-[200px] justify-center items-center flex flex-col "
      key={id}
    >
      {img  ? (
        <div className=" w-[180px] h-[180px] relative">
          <input
            type="file"
            alt=""
            className="absolute top-0 left-0 right-0 bottom-0 opacity-0"
            onChange={handleImg}
          />
          <img
            src={img}
            className="w-[180px] h-[180px] object-cover mb-3"
            alt="Model Img"
          />
        </div>
      ) : (
        <div className="relative w-[180px] h-[180px] flex flex-col justify-center items-center border-2 border-primary rounded-lg m-auto">
          <input
            type="file"
            alt=""
            className="absolute top-0 left-0 right-0 bottom-0 opacity-0"
            onChange={handleImg}
          />
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className="text-6xl text-primary "
          />
          <div className="text-primary text-lg">Drag and Drop File</div>
          <div className="text-primary text-lg">OR</div>
          <Button title="Upload File" onClick={() => {}} />
        </div>
      )}

      <div
        onClick={onRemove}
        className="absolute top-2 right-4 text-center text-red-600 font-bold w-[30px] h-[30px] border-4 border-red-600 rounded-full"
      >
        <FontAwesomeIcon icon={faMinus} />
      </div>

      <AdminInput
        label="Title"
        input={title}
        handleChange={(s: string) => handleTitle(s)}
      />
      <AdminInput
        label="Color"
        input={color}
        handleChange={(s: string) => handleColor(s)}
      />
    </div>
  );
};

export default Model;
