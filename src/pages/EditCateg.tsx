// import AdminMultipleSelect from "../components/AdminMultipleSelect";
import AdminInput from "../components/AdminInput";
// import AdminSelect from "../components/AdminSelect";
import { useEffect, useState } from "react";
import axios from "axios";
// import AdminTextArea from "../components/AdminTextArea";
// import CategInfoSection from "../components/ProductInfoSection"; // AA GO BACK TO Might be needed mostly not
// import AddCircle from "../icons/AddCircle";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Button from "../components/Button";
// import AdminMDXEditor from "../components/AdminMDXEditor";

// import Model from "../components/Model";
import { useNavigate, useParams } from "react-router-dom";
import { fromJsonToCategory, CategModel } from "../models/Categ";

const EditCateg: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [categories, setCateg] = useState<CategModel | null>(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [categInfo, setCategInfo] = useState<
    { title: string; }[]
  >([]);
  const [infoId, setInfoId] = useState<number | null>(null);
  const [infoTitle, setInfoTitle] = useState("");




  const [errorList, setErrorList] = useState<{ key: string; error: string }[]>(
    []
  );


  const [open, setOpen] = useState(false);
  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setInfoId(null);
    setInfoTitle("");
    setOpen(false);
  };


  const setData = async ({ categories }: { categories: CategModel | null }) => {
    if (categories) {
      setTitle(categories.title);
    }
  };

  useEffect(() => {
    const fetchCategData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "shop/categories?id=" + id
        );

        setCateg(fromJsonToCategory(response.data["data"][0]));
      } catch {
        return;
      }
    };
    //TODO: Fetch Categories Data
    fetchCategData();
  }, [id]);

  // Separate useEffect to run `setData` after `categories` is updated
  useEffect(() => {
    if (categories) {
      setData({ categories });
    }
  }, [categories]);

  const editCateg = async () => {
    try {
      const form = new FormData();
      if (title != "") {
        setErrorList((prev) => prev.filter((error) => error.key !== "title"));
        form.append("title", title);
      } else {
        setErrorList((prev) => {
          const existingErrorIndex = prev.findIndex(
            (error) => error.key === "title"
          );
          if (existingErrorIndex !== -1) {
            const updatedErrors = [...prev];
            updatedErrors[existingErrorIndex] = {
              key: "title",
              error: "This Field is Required",
            };
            return updatedErrors;
          } else {
            return [...prev, { key: "title", error: "This Field is Required" }];
          }
        });
      }


      if (categInfo.length > 0) {
        categInfo.forEach((info, index) => {
          form.append(
            `categ_info[${index}]`,
            `{"title":"${info.title}"}`
          );
        });
      } else {
        setErrorList((prev) => {
          const existingErrorIndex = prev.findIndex(
            (error) => error.key === "categ_info"
          );
          if (existingErrorIndex !== -1) {
            const updatedErrors = [...prev];
            updatedErrors[existingErrorIndex] = {
              key: "categ_info",
              error: "This Field is Required",
            };
            return updatedErrors;
          } else {
            return [
              ...prev,
              { key: "categ_info", error: "This Field is Required" },
            ];
          }
        });
      }


      for (const pair of form.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      if (errorList.length == 0) {
        const response = await axios.put(
          process.env.REACT_APP_BASE_URL + "shop/categories/" + id,
          form
        );
        if (response.data["success"] == true) {
          navigate(-1);
        }
      }
    } catch (error) {
      console.log(error);
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
            // value={title}
            handleChange={(s: string) => setInfoTitle(s)}
          />

          <div className="flex justify-center gap-3">
            <Button
              onClick={() => {
                if (infoId === null) {
                  setCategInfo((prev) => [
                    ...prev,
                    { title: infoTitle },
                  ]);
                } else {
                  setCategInfo((prev) =>
                    prev.map((info, index) =>
                      index === infoId
                        ? { title: infoTitle }
                        : info
                    )
                  );
                  setInfoId(null);
                }
                onCloseModal();
              }}
              title="Add"
              className="text-sm font-semibold"
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
        </Box>
      </Modal>
      <div className="text-2xl font-semibold text-primary mb-5 flex justify-between items-center">
        Edit Category
      </div>
      <AdminInput
        label="Title"
        input={title}
        handleChange={(s: string) => setTitle(s)}
        errorText={errorList.find((error) => error.key === "title")?.error}
      />
      <div className="flex justify-center items-center gap-3">
        <Button
          title="Save"
          className="text-sm font-semibold"
          onClick={() => editCateg()}
        />
        <button
          onClick={() => { }}
          className="py-1 px-4 text-sm font-semibold bg-gray-200 text-gray-600 rounded-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCateg;
