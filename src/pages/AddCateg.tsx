import AdminInput from "../components/AdminInput";
import { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const AddCateg = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [infoTitle, setInfoTitle] = useState("");
  const [infoIsActive, setInfoIsActive] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [errorList, setErrorList] = useState<{ key: string; error: string }[]>(
    []
  );

  const updateError = (key: string, error: string | null) => {
    setErrorList((prev) => {
      if (error) {
        const existingErrorIndex = prev.findIndex((err) => err.key === key);
        if (existingErrorIndex !== -1) {
          const updatedErrors = [...prev];
          updatedErrors[existingErrorIndex].error = error;
          return updatedErrors;
        } else {
          return [...prev, { key, error }];
        }
      } else {
        return prev.filter((err) => err.key !== key);
      }
    });
  };


  const [open, setOpen] = useState(false);
  const onCloseModal = () => {
    setInfoIsActive("");
    setOpen(false);
  };

  const addCateg = async () => {
    try {
      const form = new FormData();

      if (!title) updateError("title", "Title is required");
      else {
        updateError("title", null);
        form.append("title", title);
      }


      if (errorList.length === 0) {
        const response = await axios.post(
          process.env.REACT_APP_BASE_URL + "shop/categories",
          form
        );
        if (response.data["success"]) navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white w-full h-full px-5 py-6 rounded-lg">
      <Modal
        open={open}
        onClose={onCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 md:w-[700px] w-[90%] bg-white shadow-md p-4 -translate-x-1/2 -translate-y-1/2 rounded-xl space-y-3">
          <div className="text-xl font-semibold text-primary">
            Add Info Section
          </div>
          <AdminInput
            label="Title"
            input={infoTitle}
            handleChange={(s: string) => setInfoTitle(s)}
          />
        </Box>
      </Modal>
      <div className="text-2xl font-semibold text-primary mb-5 flex justify-between items-center">
        Add Category
      </div>
      <AdminInput
        label="Title"
        input={title}
        handleChange={(s: string) => setTitle(s)}
        errorText={errorList.find((error) => error.key === "title")?.error}
      />
      {/* <AdminMultipleSelect // AA GO BACK TO TEST
        label="Active"
        options={[{ 'id': 0, 'title': '0' }, { 'id': 1, 'title': '1' }]}
        selected={selectedCategories}
        handleSelection={(id: number) =>
          setSelectedCategories((prevSelected) =>
            prevSelected.includes(id)
              ? prevSelected.filter((optionId) => optionId !== id)
              : [...prevSelected, id]
          )
        }
        errorText={
          errorList.find((error) => error.key === "categories")?.error
        }
      /> */}
      <div className="relative w-full mb-3">
        <div className="text-primary font-semibold text-lg mb-2">Status</div>
        <select
          className="w-full border-2 border-primary rounded-2xl py-3 px-2 text-primary font-semibold flex justify-between items-center cursor-pointer outline-none"
          onChange={(e) => { setInfoIsActive(e.target.value) }}
          value={infoIsActive}

        >
          <option value="1">Active</option>
          <option value="0">Not Active</option>
        </select>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-2 border-primary rounded-xl z-10 mt-2">
            {[{ id: 0, title: 0 }, { id: 1, title: 1 }].map((option) => (
              <div
                key={option.id}
                className="flex items-center p-2 hover:bg-secondary first:rounded-t-xl last:rounded-b-xl text-primary font-semibold"
              >

                <label>{option.title}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-3">
        <Button
          title="Save"
          className="text-sm font-semibold"
          onClick={addCateg}
        />
        <button
          onClick={() => {
            onCloseModal();
          }}
          className="py-1 px-4 text-sm font-semibold bg-gray-200 text-gray-600 rounded-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddCateg;
