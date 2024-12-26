import { LearnToSwimModel } from "../models/learn-to-swim";

const Level = ({ level }: { level: LearnToSwimModel }) => {
  return (
    <div className="w-[300px] text-center space-y-4">
      <div className="text-2xl text-primary font-semibold">{level.title}</div>

      {level.header_image ? (
        <img
          className="w-full h-[100px] object-cover rounded-xl"
          src={process.env.REACT_APP_BASE_URL + "uploads/" + level.header_image}
          alt="Header Image"
        />
      ) : (
        <div className="w-full h-[100px] bg-gray-200 rounded-xl flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
    </div>
  );
};

export default Level;
