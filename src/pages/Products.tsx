import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { fromJsonToProduct, ProductModel } from "../models/product";
import AddCircle from "../icons/AddCircle";
import { useNavigate } from "react-router-dom";
import "../CSS/productManage.css";
import X from "../assets/X.svg";

const Products = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [cardvisible, setCardvisible] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/products"
      );
      const productsData = response.data["data"].map((data: any) =>
        fromJsonToProduct(data)
      );

      setProducts(productsData);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_BASE_URL + "shop/products/" + id
      );

      setProducts((prevProd) =>
        prevProd.filter((prod) => prod.id.toString() !== id)
      );

      console.log(response);
    } catch { }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        setErrorMessage('Please select an .xlsx file');
        setFile(null);
      } else {
        setFile(selectedFile);
        setErrorMessage('');
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        setErrorMessage('Please select an .xlsx file');
        setFile(null);
      } else {
        setFile(selectedFile);
        setErrorMessage('');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUnload = () => {
    if (!file) {
      return null;
    } else {
      setFile(null);
    }

  }

  const handleUpload = () => { // AA BACKEND IA takeover
    if (!file) {
      setErrorMessage('Please select a file first');
      console.error('Please select a file first');
    } else {
      const formData = new FormData();
      formData.append('file', file);

      // Add your upload logic here
      fetch('https://shop.proswim-lb.com/api/products/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          setFile(null);
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
      console.log('Uploading:', file);
    }
    setCardvisible(""); // AA need for frontend
    window.location.reload();
  };

  return (
    <div className="ProductsPage bg-white w-full h-full px-5 py-6 rounded-lg">
      {
        cardvisible === "Upload Data" ? <>
          <div className="Hero__blurBg">
            <div className="DashHero__blurBg">
              <div className="blurcard">
                <img className="X" src={X} alt="Close Add Data" title="Close"
                  onClick={() => {
                    setCardvisible("");
                    setErrorMessage("");
                    handleUnload();
                  }} />
                <h1>Upload File</h1>

                {/* REMOVED DATEPICKR FROM HERE AA GO BACK TO */}
                <div className="CodeDropForm">
                  <form className="form-container" encType='multipart/form-data' >
                    <div className="upload-files-container">
                      <div className="drag-file-area" onDrop={handleDrop} onDragOver={handleDragOver}>
                        {file ? (
                          <div className="file-info">
                            <span className="file-name">{file.name}</span> | <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
                          </div>
                        ) : (
                          <>
                            <h3 className="dynamic-message">Drag & drop any file here</h3>
                            <label className="label">
                              <span className="browse-files">
                                <input type="file" className="default-file-input" onChange={handleFileChange} />
                                <div className="flex ">
                                  <span>
                                    or
                                  </span>
                                  <span className="browse-files-text">browse file</span>
                                  <span>from device</span>
                                </div>
                              </span>
                            </label>
                          </>
                        )}
                      </div>
                      {errorMessage && <div className="error-message text-red-600">{errorMessage}</div>}
                      {file && (
                        <div className="file-block">
                          <span className="material-icons remove-file-icon" onClick={() => setFile(null)}>delete</span>
                          <div className="progress-bar"></div>
                        </div>
                      )}
                      <div className="CTAContainer">
                        <button
                          type="submit"
                          className="CTA upload-button"
                        onClick={() => { handleUpload() }} // AA GO BACK TO active after IA BACKEND
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                  </form>
                </div>



              </div>
            </div>
          </div>
        </> : <></>
      }
      <div className="text-2xl font-semibold text-primary mb-5 flex justify-between items-center">
        Products
        <div className="flex items-center gap-3 justify-center">
          <button className="uploudBtn"
            onClick={() => {
              setCardvisible("Upload Data");
              setErrorMessage("");
              handleUnload();
            }}
          >Upload</button>
          <AddCircle
            handleClick={() => {
              navigate("/products/add");
            }}
            size="h-8 w-8"
          />
        </div>
      </div>

      {loading ? (
        <div>Loading Products...</div>
      ) : (
        products && (
          <div className="flex flex-wrap gap-3">
            {products.map((prod) => (
              <ProductCard
                key={prod.id}
                id={prod.id.toString()}
                images={prod.images}
                brand={prod.brand.title}
                title={prod.title}
                price={
                  "$" + (prod.price.find((p) => p.currency === "usd")?.value || "Price not available")
                }
                onDelete={() => deleteProduct(prod.id.toString())}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Products;
