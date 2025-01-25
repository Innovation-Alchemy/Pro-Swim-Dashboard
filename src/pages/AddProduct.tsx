import AdminMultipleSelect from "../components/AdminMultipleSelect";
import AdminInput from "../components/AdminInput";
import AdminSelect from "../components/AdminSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminTextArea from "../components/AdminTextArea";
import ProductInfoSection from "../components/ProductInfoSection";
import AddCircle from "../icons/AddCircle";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Button from "../components/Button";
import AdminMDXEditor from "../components/AdminMDXEditor";

import Model from "../components/Model";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(-1);
  // const [selectedSport, setSelectedSport] = useState(-1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<number[]>([]);
  // const [priceLBP, setPriceLBP] = useState(0);
  const [priceUSD, setPriceUSD] = useState(0);

  const [brands, setBrands] = useState<{ id: number; title: string }[]>([]);
  // const [sports, setSports] = useState<{ id: number; title: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; title: string }[]>(
    []
  );
  const [genders, setGenders] = useState<{ id: number; title: string }[]>([]);

  const [productInfo, setProductInfo] = useState<
    { title: string; description: string }[]
  >([]);
  const [infoId, setInfoId] = useState<number | null>(null);
  const [infoTitle, setInfoTitle] = useState("");
  const [infoDescription, setInfoDescription] = useState("");

  const [models, setModels] = useState<
    {
      id: number;
      title: string;
      color: string | "";
      image: File | null;
    }[]
  >([]);

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

  const handleModelsImg = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const selectedFiles = event.target.files as FileList;
    setModels((prevModels) => {
      const existingModelIndex = prevModels.findIndex(
        (model) => model.id === id
      );

      if (existingModelIndex !== -1) {
        const updatedModels = [...prevModels];
        updatedModels[existingModelIndex] = {
          ...updatedModels[existingModelIndex],
          image: selectedFiles?.[0],
        };
        return updatedModels;
      } else {
        return [
          ...prevModels,
          {
            id,
            title: "",
            color: "",
            image: selectedFiles?.[0],
          },
        ];
      }
    });
  };

  const handleModelsTitle = (title: string, id: number) => {
    setModels((prevModels) => {
      const existingModelIndex = prevModels.findIndex(
        (model) => model.id === id
      );

      if (existingModelIndex !== -1) {
        const updatedModels = [...prevModels];
        updatedModels[existingModelIndex] = {
          ...updatedModels[existingModelIndex],
          title,
        };
        return updatedModels;
      } else {
        return [
          ...prevModels,
          {
            id,
            title,
            color: "",
            image: null,
          },
        ];
      }
    });
  };

  const handleModelsColor = (color: string, id: number) => {
    setModels((prevModels) => {
      const existingModelIndex = prevModels.findIndex(
        (model) => model.id === id
      );

      if (existingModelIndex !== -1) {
        const updatedModels = [...prevModels];
        updatedModels[existingModelIndex] = {
          ...updatedModels[existingModelIndex],
          color,
        };
        return updatedModels;
      } else {
        return [
          ...prevModels,
          {
            id,
            title: "",
            color,
            image: null,
          },
        ];
      }
    });
  };

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setInfoId(null);
    setInfoTitle("");
    setInfoDescription("");
    setOpen(false);
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/brands"
      );

      setBrands(response.data["data"]);
    } catch { }
  };

  // const fetchSports = async () => {
  //   try {
  //     const response = await axios.get(
  //       process.env.REACT_APP_BASE_URL + "shop/sports"
  //     );

  //     setSports(response.data["data"]);
  //   } catch { }
  // };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/categories"
      );

      setCategories(response.data["data"]);
    } catch { }
  };

  const fetchGenders = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/genders"
      );

      setGenders(response.data["data"]);
    } catch { }
  };

  useEffect(() => {
    fetchBrands();
    // fetchSports();
    fetchCategories();
    fetchGenders();
  }, []);

  const addProduct = async () => {
    try {
      const form = new FormData();

      if (!title) updateError("title", "Title is required");
      else {
        updateError("title", null);
        form.append("title", title);
      }

      if (!description) updateError("description", "Description is required");
      else {
        updateError("description", null);
        form.append("description", description);
      }

      if (selectedBrand < 0) updateError("brand", "Brand is required");
      else {
        updateError("brand", null);
        form.append("brand", selectedBrand.toString());
      }

      // if (selectedSport < 0) updateError("sport", "Sport is required");
      // else {
      //   updateError("sport", null);
      //   form.append("sport", selectedSport.toString());
      // }

      if (selectedCategories.length === 0)
        updateError("categories", "At least one category is required");
      else {
        updateError("categories", null);
        selectedCategories.forEach((category, index) => {
          form.append(`categories[${index}]`, category.toString());
        });
      }

      if (selectedGenders.length === 0)
        updateError("genders", "At least one gender is required");
      else {
        updateError("genders", null);
        selectedGenders.forEach((gender, index) => {
          form.append(`genders[${index}]`, gender.toString());
        });
      }

      if (priceUSD <= 0)
        updateError("price", "Price must be greater than zero");
      else {
        updateError("price", null);
        form.append(
          "price",
          // `[{"currency": "usd", "value": ${priceUSD}},{"currency":"lbp","value": ${priceLBP}}]` IA BACKEND GO BACK TO calculate the lbp here ?
          `[{"currency": "usd", "value": ${priceUSD}}]`
        );
      }

      if (stock <= 0) updateError("stock", "Stock must be greater than zero");
      else {
        updateError("stock", null);
        form.append("stock", stock.toString());
      }

      if (productInfo.length === 0)
        updateError("product_info", "At least one product info section is required");
      else {
        updateError("product_info", null);
        productInfo.forEach((info, index) => {
          form.append(
            `product_info[${index}]`,
            JSON.stringify({ title: info.title, description: info.description })
          );
        });
      }

      if (models.length === 0) updateError("models", "At least one model is required");
      else {
        updateError("models", null);
        models.forEach((model, index) => {
          form.append(`images[${index}][color]`, model.color);
          if (model.image) form.append(`images[${index}][image]`, model.image);
        });
      }

      if (errorList.length === 0) {
        const response = await axios.post(
          process.env.REACT_APP_BASE_URL + "shop/products",
          form
        );

        if (response.data["success"]) navigate(-1);
      }
      for (let pair of form.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
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
          <AdminMDXEditor
            label="Description"
            input={infoDescription}
            handleChange={(s: string) => setInfoDescription(s)}
          />
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => {
                if (infoId === null) {
                  setProductInfo((prev) => [
                    ...prev,
                    { title: infoTitle, description: infoDescription },
                  ]);
                } else {
                  setProductInfo((prev) =>
                    prev.map((info, index) =>
                      index === infoId
                        ? { title: infoTitle, description: infoDescription }
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
        Add Product
      </div>
      <AdminInput
        label="Title"
        input={title}
        handleChange={(s: string) => setTitle(s)}
        errorText={errorList.find((error) => error.key === "title")?.error}
      />
      <div className="xl:flex grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-2">
        <AdminSelect
          label="Brand"
          options={brands}
          selected={selectedBrand}
          handleSelection={(id: number) => setSelectedBrand(id)}
          errorText={errorList.find((error) => error.key === "brand")?.error}
        />
        {/* <AdminSelect
          label="Sport"
          options={sports}
          selected={selectedSport}
          handleSelection={(id: number) => setSelectedSport(id)}
          errorText={errorList.find((error) => error.key === "sport")?.error}
        /> */}
        <AdminMultipleSelect
          label="Categories"
          options={categories}
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
        />
        <AdminMultipleSelect
          label="Genders"
          options={genders}
          selected={selectedGenders}
          handleSelection={(id: number) =>
            setSelectedGenders((prevSelected) =>
              prevSelected.includes(id)
                ? prevSelected.filter((optionId) => optionId !== id)
                : [...prevSelected, id]
            )
          }
          errorText={errorList.find((error) => error.key === "genders")?.error}
        />
      </div>
      <div className="xl:flex grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-2">
        {/* <AdminInput
          label="Price LBP"
          type="decimal"
          input={priceLBP.toString()}
          handleChange={(s: string) => setPriceLBP(parseFloat(s))}
          errorText={errorList.find((error) => error.key === "price")?.error}
        /> */}
        <AdminInput
          label="Price USD"
          type="decimal"
          input={priceUSD.toString()}
          handleChange={(s: string) => {
            if (s != null) setPriceUSD(parseFloat(s));
          }}
        />
        <div className="w-[30%]">
          <AdminInput
            label="Stock"
            type="number"
            input={stock.toString()}
            handleChange={(s: string) => setStock(parseInt(s))}
            errorText={errorList.find((error) => error.key === "stock")?.error}
          />
        </div>
      </div>
      <AdminTextArea
        label="Description"
        input={description}
        handleChange={(s: string) => setDescription(s)}
        errorText={
          errorList.find((error) => error.key === "description")?.error
        }
      />
      <div className="w-full mb-3">
        <div className="text-primary font-semibold text-lg mb-2">
          Product Info
        </div>
        <div className="w-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 border-2 border-primary rounded-2xl py-3 px-2 text-primary font-semibold gap-5">
          {productInfo.map((info, index) => (
            <ProductInfoSection
              key={index}
              title={info.title}
              description={info.description}
              onRemove={() => {
                setProductInfo((prev) => prev.filter((_, i) => i !== index));
              }}
              onEdit={() => {
                setInfoId(index);
                setInfoTitle(info.title);
                setInfoDescription(info.description);
                onOpenModal();
              }}
            />
          ))}
          <div
            onClick={onOpenModal}
            className="h-[80px] flex items-center justify-center text-xl font-bold"
          >
            <AddCircle size="h-12 w-12 mr-3" /> Add New Section
          </div>
        </div>
        {errorList.find((error) => error.key === "product_info") && (
          <div className="text-red-600 ">
            {errorList.find((error) => error.key === "product_info")?.error}
          </div>
        )}
      </div>
      <div className="w-full mb-3">
        <div className="text-primary font-semibold text-lg mb-2">Models</div>
        <div className="flex flex-wrap gap-3">
          {models.map((model) => (
            <Model
              key={model.id}
              id={model.id}
              title={model.title}
              color={model.color}
              img={model.image ? URL.createObjectURL(model.image) : null}
              onRemove={() => {
                setModels((prev) => prev.filter((_, i) => i !== model.id - 1));
              }}
              handleTitle={(s: string) => handleModelsTitle(s, model.id)}
              handleColor={(s: string) => handleModelsColor(s, model.id)}
              handleImg={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleModelsImg(event, model.id)
              }
            />
          ))}
          <div
            className="flex justify-center items-center w-[200px]"
            onClick={() => {
              setModels((prevModels) => [
                ...prevModels,
                {
                  id:
                    prevModels.length > 0
                      ? Math.max(...prevModels.map((m) => m.id)) + 1
                      : 1,
                  title: "",
                  color: "",
                  image: null,
                },
              ]);
            }}
          >
            <AddCircle size="h-20 w-20 text-primary" />
          </div>
        </div>
        {errorList.find((error) => error.key === "model") && (
          <div className="text-red-600 ">
            {errorList.find((error) => error.key === "model")?.error}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center gap-3">
        <Button
          title="Save"
          className="text-sm font-semibold"
          onClick={addProduct}
        />
        <button
          onClick={() => { window.history.back(); }}
          className="py-1 px-4 text-sm font-semibold bg-gray-200 text-gray-600 rounded-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
