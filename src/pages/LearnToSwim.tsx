import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  fromJsonToLearnToSwim,
  LearnToSwimModel,
} from "../models/learn-to-swim";
import Level from "../components/Level";
import { useNavigate } from "react-router-dom";

const LearnToSwim = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState<LearnToSwimModel[]>([]);

  const fetchLevels = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "learn-to-swim/levels"
      );

      const levelsData = response.data["data"].map((data: any) =>
        fromJsonToLearnToSwim(data)
      );

      setLevels(levelsData);
    } catch {
      return;
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
    <div
      className={`bg-white w-full p-7 rounded-lg h-full flex flex-col md:overflow-x-hidden overflow-x-scroll `}
    >
      <div className="text-xl text-primary font-semibold flex justify-between">
        levels
        <div
          onClick={() => {
            navigate("/learn-to-swim/add");
          }}
          className="border-[3px] border-primary rounded-md flex justify-center items-center w-[30px] h-[30px]"
        >
          <FontAwesomeIcon icon={faAdd} />
        </div>
      </div>
      <div className="flex gap-5 flex-wrap">
        {levels.map((level) => (
          <Level key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
};

export default LearnToSwim;
