// import AdminMultipleSelect from "../components/AdminMultipleSelect";
import AdminInput from "../components/AdminInput";
// import AdminSelect from "../components/AdminSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminTextArea from "../components/AdminTextArea";
// import BrandInfoSection from "../components/BrandInfoSection";
// import AddCircle from "../icons/AddCircle";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Button from "../components/Button";
// import AdminMDXEditor from "../components/AdminMDXEditor";

// import Model from "../components/Model";
import { useNavigate, useParams } from "react-router-dom";
import { fromJsonToBrand, BrandModel } from "../models/brand";

const EditBrand: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [brand, setBrand] = useState<BrandModel | null>(null);
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  // const [description, setDescription] = useState("");

  const [errorList, setErrorList] = useState<{ key: string; error: string }[]>(
    []
  );




  const [open, setOpen] = useState(false);
  // const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
  };


  const setData = async ({ brand }: { brand: BrandModel | null }) => {
    if (brand) {
      setTitle(brand.title);
      // setDescription(brand.description);

      // let lastIndex = 0;

      // Function to convert URL to a File
      // const urlToFile = async (url: string): Promise<File> => {
      //   const response = await fetch(url);
      //   const blob = await response.blob();
      //   console.log(blob);

      //   return new File([blob], url, { type: blob.type });
      // };

    }
  };

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "shop/brands"
        );

        setBrand(fromJsonToBrand(response.data["data"][0]));
      } catch {
        return;
      }
    };
    //TODO: Fetch Brand Data
    fetchBrandData();
  }, [id]);

  // Separate useEffect to run `setData` after `brand` is updated
  useEffect(() => {
    if (brand) {
      setData({ brand });
    }
  }, [brand]);

  const editBrand = async () => {
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
      // if (description != "") {
      //   form.append("description", description);
      // } else {
      //   setErrorList((prev) => {
      //     const existingErrorIndex = prev.findIndex(
      //       (error) => error.key === "description"
      //     );
      //     if (existingErrorIndex !== -1) {
      //       const updatedErrors = [...prev];
      //       updatedErrors[existingErrorIndex] = {
      //         key: "description",
      //         error: "This Field is Required",
      //       };
      //       return updatedErrors;
      //     } else {
      //       return [
      //         ...prev,
      //         { key: "description", error: "This Field is Required" },
      //       ];
      //     }
      //   });
      // }

      for (const pair of form.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      if (errorList.length == 0) {
        const response = await axios.put(
          process.env.REACT_APP_BASE_URL + "shop/brands/" + id,
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
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => {
                // if (infoId === null) {
                //   setBrandInfo((prev) => [
                //     ...prev,
                //     { title: infoTitle, description: infoDescription },
                //   ]);
                // } else {
                //   setBrandInfo((prev) =>
                //     prev.map((info, index) =>
                //       index === infoId
                //         ? { title: infoTitle, description: infoDescription }
                //         : info
                //     )
                //   );
                //   // setInfoId(null);
                // }
                console.log("apple juice"); // AA TEST
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
        Add Brand
      </div>
      <AdminInput
        label="Title"
        input={title}
        handleChange={(s: string) => setTitle(s)}
        errorText={errorList.find((error) => error.key === "title")?.error}
      />
      {/* <AdminTextArea
        label="Description"
        input={description}
        handleChange={(s: string) => setDescription(s)}
        errorText={
          errorList.find((error) => error.key === "description")?.error
        }
      /> */}

      <div className="flex justify-center items-center gap-3">
        <Button
          title="Save"
          className="text-sm font-semibold"
          onClick={() => editBrand()}
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

export default EditBrand;
