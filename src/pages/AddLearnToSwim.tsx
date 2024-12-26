import { useState } from "react";
import AdminInput from "../components/AdminInput";
import LevelDetailsSection from "../components/LevelDetailsSection";
import { LearnToSwimModel, SectionModel } from "../models/learn-to-swim";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";

const AddLearnToSwim = () => {
  const [title, setTitle] = useState("");
  const [headerImage, setHeaderImage] = useState<File>();
  const [sections, setSections] = useState<SectionModel[]>([]);

  const [errorList, setErrorList] = useState<{ key: string; error: string }[]>(
    []
  );
  return (
    <div className="bg-white w-full h-full px-5 py-6 rounded-lg">
      {/* TODO: MODAL HERE */}
      <div className="text-2xl font-semibold text-primary mb-5 flex justify-between items-center">
        Add Level
      </div>
      <AdminInput
        label="Level Title"
        input={title}
        handleChange={(s: string) => setTitle(s)}
        errorText={errorList.find((error) => error.key === "title")?.error}
      />
      <div>
        <div className="text-lg font-semibold text-primary mb-2">
          Level Image
        </div>
        <div className="w-full h-[300px] border border-gray-500 rounded-xl relative">
          <input
            type="file"
            alt=""
            className="absolute top-0 bottom-0 left-0 right-0 opacity-0"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.files) setHeaderImage(event.target.files[0]);
            }}
          />
          {headerImage ? (
            <img
              src={URL.createObjectURL(headerImage)}
              className="w-full h-full object-cover rounded-xl"
              alt="Header Image"
            />
          ) : (
            <div className="bg-gray-300 rounded-xl text-gray-500 font-semibold md:text-3xl text-2xl w-full h-full flex justify-center items-center">
              Click to Add Header Image
            </div>
          )}
        </div>
      </div>
      <div className="my-3">
        <div className="text-lg font-semibold text-primary mb-2 flex justify-between">
          Level Details
          <div
            onClick={() => {
              setSections((prevSections: SectionModel[]) => [
                ...prevSections,
                {
                  id: prevSections.length + 1,
                  level_id: "-1",
                  title: "", // Empty title ready for input
                  markdown_text: "", // Placeholder for description
                  is_active: 1,
                  list_of_content: [], // Empty content array
                },
              ]);
            }}
            className="border-[3px] border-primary rounded-md flex justify-center items-center w-[30px] h-[30px]"
          >
            <FontAwesomeIcon icon={faAdd} />
          </div>
        </div>
        {sections.map((section) => (
          <LevelDetailsSection
            key={section.id}
            index={section.id}
            title={section.title}
            handleTitle={(s: string) =>
              setSections((prevSections) =>
                prevSections.map((prevSection) =>
                  prevSection.id === section.id
                    ? { ...prevSection, title: s } // Update the title for the correct section
                    : prevSection
                )
              )
            }
            description={section.markdown_text}
            handleDescription={(s: string) =>
              setSections((prevSections) =>
                prevSections.map((prevSection) =>
                  prevSection.id === section.id
                    ? { ...prevSection, markdown_text: s } // Update the title for the correct section
                    : prevSection
                )
              )
            }
            content={[]}
          />
        ))}
      </div>
      <div className="flex justify-center items-center gap-3">
        <Button
          title="Save"
          className="text-sm font-semibold"
          onClick={() => {
            console.log(title);
            console.log(headerImage);
            console.log(sections);
          }}
        />
        <button
          onClick={() => {}}
          className="py-1 px-4 text-sm font-semibold bg-gray-200 text-gray-600 rounded-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddLearnToSwim;
