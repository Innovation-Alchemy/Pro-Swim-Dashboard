import { ListOfContent } from "../models/learn-to-swim";
import AdminInput from "./AdminInput";
import AdminMDXEditor from "./AdminMDXEditor";

const LevelDetailsSection = ({
  index,
  title,
  handleTitle,
  description,
  handleDescription,
  content,
}: {
  index: number;
  title: string;
  handleTitle: (s: string) => void;
  description: string;
  handleDescription: (s: string) => void;
  content: ListOfContent[];
}) => {
  return (
    <div>
      <div className="text-lg font-semibold text-primary mb-2">
        Section {index}:
      </div>
      <AdminInput
        label={`Section ${index} Title`}
        input={title}
        handleChange={(s: string) => handleTitle(s)}
      />
      <AdminMDXEditor
        label={`Section ${index} Description`}
        input={description}
        handleChange={(s: string) => handleDescription(s)}
      />
    </div>
  );
};

export default LevelDetailsSection;
