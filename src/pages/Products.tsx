import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { fromJsonToProduct, ProductModel } from "../models/product";
import AddCircle from "../icons/AddCircle";
import { useNavigate } from "react-router-dom";
import "../CSS/productManage.css";
import X from "../assets/X.svg";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

      // console.log(response);
    } catch { }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (e) => {
    // Handle date change logic here
    setSelectedDate(e.target.value);
  };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     if (selectedFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
  //       setErrorMessage('Please select an .xlsx file');
  //       setFile(null);
  //     } else {
  //       setFile(selectedFile);
  //       setErrorMessage('');
  //     }
  //   }
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   const selectedFile = e.dataTransfer.files[0];
  //   if (selectedFile) {
  //     if (selectedFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
  //       setErrorMessage('Please select an .xlsx file');
  //       setFile(null);
  //     } else {
  //       setFile(selectedFile);
  //       setErrorMessage('');
  //     }
  //   }
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  const handleUnload = () => {
    if (!file) {
      return null;
    } else {
      setFile(null);
    }

  }

  const handleUpload = () => {
    fetch('https://shop.proswim-lb.com/api/shop/SyncProductsPOS', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
    window.location.reload();
  };

  const handleGetSales = (e) => {
    e.preventDefault();
    fetch("https://shop.proswim-lb.com/api/shop/ordersByDate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: selectedDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success || !data.data) {
          console.error("No orders found or API error.");
          return;
        }
  
        // Flatten the nested array structure
        const flattenedData = data.data.flat().map((order, index) => ({
          Barcode: order.barcode,
          Quantity: order.product_quantity,
          Price: order.product_price,
        }));
  
        // Convert data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(flattenedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");
  
        // Write file and trigger download
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, `Sales_Report_${selectedDate}.xlsx`);
  
        console.log("✅ Excel file downloaded successfully.");
      })
      .catch((error) => {
        console.error("❌ Error:", error.message);
      });
  };

  const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  // const handleUpload = () => { // AA BACKEND IA takeover
  //   if (!file) {
  //     setErrorMessage('Please select a file first');
  //     console.error('Please select a file first');
  //   } else {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     // Add your upload logic here
  //     fetch('https://shop.proswim-lb.com/api/products/upload', {
  //       method: 'POST',
  //       body: formData,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log('Success:', data);
  //         setFile(null);
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error.message);
  //       });
  //     console.log('Uploading:', file);
  //   }
  //   setCardvisible(""); // AA need for frontend
  //   window.location.reload();
  // };

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
                    // handleUnload();
                  }} />
                <h1>Export Sales Report</h1>

                {/* REMOVED DATEPICKR FROM HERE AA GO BACK TO */}
                <div className="CodeDropForm">
                  <form className="form-container">
                    <div className="upload-files-container">
                      <div className="drag-file-area">
                        <h3 className="dynamic-message">Select a Date</h3>
                        <label className="label">
                          <span className="browse-files">
                            <input
                              type="date"
                              className="default-date-input"
                              onChange={handleDateChange}
                            />
                          </span>
                        </label>
                      </div>
                      {errorMessage && <div className="error-message text-red-600">{errorMessage}</div>}
                      <div className="CTAContainer">
                        <button
                          type="submit"
                          className="CTA upload-button"
                          onClick={(e) => { handleGetSales(e) }}
                        >
                          Export
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
      <div className="searchContainer flex items-center justify-between w-full mb-4">
                <input
                  type="text"
                  className="searchInput w-full p-2 border border-gray-300 rounded"
                  placeholder="Search for products..."
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    setFilteredProducts(
                      products.filter((item) =>
                        item.title.toLowerCase().includes(searchTerm)
                      )
                    );
                  }}
                />
              </div>
      <div className="text-2xl font-semibold text-primary mb-5 flex justify-between items-center">
        Products
        <div className="flex items-center gap-3 justify-center">
          <button className="uploudBtn"
            onClick={() => {
              // setCardvisible("Upload Data");
              // setErrorMessage("");
              // handleUnload();
              handleUpload();
            }}
          >Sync Products</button>
          <button className="uploudBtn"
            onClick={() => {
              setCardvisible("Upload Data");
              setErrorMessage("");
              handleUnload();
              // handleUpload();
            }}
          >Sales Report</button>
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
            {filteredProducts.map((prod) => (
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
