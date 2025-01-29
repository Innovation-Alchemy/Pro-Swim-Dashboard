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
import { useNavigate, useParams } from "react-router-dom";
import { fromJsonToProduct, ProductModel } from "../models/product";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState(-1);
  const [selectedSport, setSelectedSport] = useState(-1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<number[]>([]);

  const [priceUSD, setPriceUSD] = useState(0);

  const [brands, setBrands] = useState<{ id: number; title: string }[]>([]);
  const [sports, setSports] = useState<{ id: number; title: string }[]>([]);
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
      title: string | "";
      color: string | "";
      image: File | null;
    }[]
  >([]);

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

  const [errorList, setErrorList] = useState<{ key: string; error: string }[]>(
    []
  );

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
    } catch {
      return;
    }
  };
  const fetchSports = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/sports"
      );

      setSports(response.data["data"]);
    } catch {
      return;
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/categories"
      );

      setCategories(response.data["data"]);
    } catch {
      return;
    }
  };
  const fetchGenders = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/genders"
      );

      setGenders(response.data["data"]);
    } catch {
      return;
    }
  };

  const setData = async ({ product }: { product: ProductModel | null }) => {
    if (product) {
      setTitle(product.title);
      setSelectedBrand(product.brand.id);
      setSelectedSport(product.sport.id);
      setSelectedCategories(product.categories.map((category) => category.id));
      setSelectedGenders(product.genders.map((gender) => gender.id));
      setPriceUSD(
        parseFloat(
          product.price.filter((price) => price.currency == "usd")[0].value
        )
      );
      setStock(product.stock);
      setDescription(product.description);
      setProductInfo(product.product_info);

      let lastIndex = 0;

      // Function to convert URL to a File
      const urlToFile = async (url: string): Promise<File> => {
        const response = await fetch(url);
        const blob = await response.blob();
        // console.log(blob);

        return new File([blob], url, { type: blob.type });
      };

      const coloredImages = await Promise.all(
        product.images.colored.map(async (colored) => {
          const file = await urlToFile(
            process.env.REACT_APP_BASE_URL + "uploads/" + colored.images[0]
          );
          lastIndex += 1;
          return {
            id: lastIndex,
            title: "Colored: " + lastIndex,
            color: colored.color,
            image: file, // Now the image is a File object, just like uploaded ones
          };
        })
      );

      const genericImages = await Promise.all(
        product.images.generic.map(async (image) => {
          const file = await urlToFile(
            process.env.REACT_APP_BASE_URL + "uploads/" + image
          );
          lastIndex += 1;
          return {
            id: lastIndex,
            title: "Generic: " + lastIndex,
            color: "",
            image: file, // Now the image is a File object, just like uploaded ones
          };
        })
      );

      const getModels = [...coloredImages, ...genericImages];
      setModels(getModels); // Set the models state with File-based images
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "shop/products?id=" + id
        );

        setProduct(fromJsonToProduct(response.data["data"][0]));
      } catch {
        return;
      }
    };
    //TODO: Fetch Product Data
    fetchBrands();
    fetchSports();
    fetchCategories();
    fetchGenders();
    fetchProductData();
  }, [id]);

  // Separate useEffect to run `setData` after `product` is updated
  useEffect(() => {
    if (product) {
      setData({ product });
    }
  }, [product]);

  const editProduct = async () => {
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
      if (description != "") {
        form.append("description", description);
      } else {
        setErrorList((prev) => {
          const existingErrorIndex = prev.findIndex(
            (error) => error.key === "description"
          );
          if (existingErrorIndex !== -1) {
            const updatedErrors = [...prev];
            updatedErrors[existingErrorIndex] = {
              key: "description",
              error: "This Field is Required",
            };
            return updatedErrors;
          } else {
            return [
              ...prev,
              { key: "description", error: "This Field is Required" },
            ];
          }
        });
      }
      if (selectedBrand > -1) {
        form.append("brand", selectedBrand.toString());
      } else {
        setErrorList((prev) => {
          const existingErrorIndex = prev.findIndex(
            (error) => error.key === "brand"
          );
          if (existingErrorIndex !== -1) {
            const updatedErrors = [...prev];
            updatedErrors[existingErrorIndex] = {
              key: "brand",
              error: "This Field is Required",
            };
            return updatedErrors;
          } else {
            return [...prev, { key: "brand", error: "This Field is Required" }];
          }
        });
      }
      if (selectedSport > -1) {
        form.append("sport", selectedSport.toString());
      } else {
        setErrorList((prev) => {
          const existingErrorIndex = prev.findIndex(
            (error) => error.key === "sport"
          );
          if (existingErrorIndex !== -1) {
            const updatedErrors = [...prev];
            updatedErrors[existingErrorIndex] = {
              key: "sport",
              error: "This Field is Required",
            };
            return updatedErrors;
          } else {
            return [...prev, { key: "sport", error: "This Field is Required" }];
          }
        });
      }
      if (selectedCategories.length > 0) {
        selectedCategories.forEach((category, index) => {
          form.append(`categories[${index}]`, category.toString());
        });
      } else {
        setErrorList((prev) => {
          const existingErrorIndex = prev.findIndex(
            (error) => error.key === "categories"
          );
          if (existingErrorIndex !== -1) {
            const updatedErrors = [...prev];
            updatedErrors[existingErrorIndex] = {
              key: "categories",
              error: "This Field is Required",
            };
            return updatedErrors;
          } else {
            return [
              ...prev,
              { key: "categories", error: "This Field is Required" },
            ];
          }
        });
      }

      if (selectedGenders.length > 0) {
        selectedGenders.forEach((gender, index) => {
          form.append(`genders[${index}]`, gender.toString());
        });
      } else {
        setErrorList((prev) => {
          const existingErrorIndex = prev.findIndex(
            (error) => error.key === "genders"
          );
          if (existingErrorIndex !== -1) {
            const updatedErrors = [...prev];
            updatedErrors[existingErrorIndex] = {
              key: "genders",
              error: "This Field is Required",
            };
            return updatedErrors;
          } else {
            return [
              ...prev,
              { key: "genders", error: "This Field is Required" },
            ];
          }
        });
      }
      if (priceUSD > 0) {
        form.append(
          "price",
          `[{"currency": "usd", "value": ${priceUSD}}]`
        );
      } else {
        setErrorList((prev) => {
          const existingErrorIndex = prev.findIndex(
            (error) => error.key === "price"
          );
          if (existingErrorIndex !== -1) {
            const updatedErrors = [...prev];
            updatedErrors[existingErrorIndex] = {
              key: "price",
              error: "This Field is Required",
            };
            return updatedErrors;
          } else {
            return [...prev, { key: "price", error: "This Field is Required" }];
          }
        });
      }
      if (stock > 0) {
        form.append("stock", stock.toString());
      } else {
        setErrorList((prev) => {
          const existingErrorIndex = prev.findIndex(
            (error) => error.key === "stock"
          );
          if (existingErrorIndex !== -1) {
            const updatedErrors = [...prev];
            updatedErrors[existingErrorIndex] = {
              key: "stock",
              error: "This Field is Required",
            };
            return updatedErrors;
          } else {
            return [...prev, { key: "stock", error: "This Field is Required" }];
          }
        });
      }

      if (productInfo.length > 0) {
        productInfo.forEach((info, index) => {
          form.append(
            `product_info[${index}]`,
            `{"title":"${info.title}", "description":"${info.description
              .replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")}" }`
          );
        });
      } else {
        setErrorList((prev) => {
          const existingErrorIndex = prev.findIndex(
            (error) => error.key === "product_info"
          );
          if (existingErrorIndex !== -1) {
            const updatedErrors = [...prev];
            updatedErrors[existingErrorIndex] = {
              key: "product_info",
              error: "This Field is Required",
            };
            return updatedErrors;
          } else {
            return [
              ...prev,
              { key: "product_info", error: "This Field is Required" },
            ];
          }
        });
      }

      if (models.length > 0) {
        models.forEach((model, index) => {
          if (model.color != "") {
            form.append(`images[${index}][color]`, model.color);
          }
          if (model.image) {
            form.append(`images[${index}][image]`, model.image);
          }
        });
      } else {
        setErrorList((prev) => {
          const existingErrorIndex = prev.findIndex(
            (error) => error.key === "model"
          );
          if (existingErrorIndex !== -1) {
            const updatedErrors = [...prev];
            updatedErrors[existingErrorIndex] = {
              key: "model",
              error: "This Field is Required",
            };
            return updatedErrors;
          } else {
            return [...prev, { key: "model", error: "This Field is Required" }];
          }
        });
      }

      for (const pair of form.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      if (errorList.length == 0) {
        const response = await axios.put(
          process.env.REACT_APP_BASE_URL + "shop/products/" + id,
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
        <AdminInput
          label="Price USD"
          type="decimal"
          input={priceUSD.toString()}
          handleChange={(s: string) => setPriceUSD(parseFloat(s))}
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
              img={
                model.image
                  ? typeof model.image === "string"
                    ? process.env.REACT_APP_BASE_URL + "uploads/" + model.image
                    : URL.createObjectURL(model.image)
                  : null
              }
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
          onClick={() => editProduct()}
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

export default EditProduct;
