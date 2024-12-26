import { useEffect, useState } from "react";
import CategCard from "../components/CategCard";
import axios from "axios";
import { fromJsonToProduct, ProductModel } from "../models/product";
import AddCircle from "../icons/AddCircle";
import { useNavigate } from "react-router-dom";
import "../CSS/productManage.css";
// import X from "../assets/X.svg";

const Categ = () => {
  const [categories, setcategories] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  // const [cardvisible, setCardvisible] = useState("");
  // const [file, setFile] = useState(null);
  // const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const fetchcategories = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/categories"
      );
      const categoriesData = response.data["data"].map((data: any) =>
        fromJsonToProduct(data)
      );

      setcategories(categoriesData);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  const deleteProduct = async (id: string) => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_BASE_URL + "shop/categories/" + id
      );

      setcategories((prevProd) =>
        prevProd.filter((prod) => prod.id.toString() !== id)
      );

      console.log(response);
    } catch { }
  };

  useEffect(() => {
    fetchcategories();
  }, []);


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

  // const handleUnload = () => {
  //   if (!file) {
  //     return null;
  //   } else {
  //     setFile(null);
  //   }

  // }

  // const handleUpload = () => { // AA BACKEND IA takeover
  //   if (!file) {
  //     setErrorMessage('Please select a file first');
  //     console.error('Please select a file first');
  //   } else {
  //     const formData = new FormData();
  //     formData.append('pool_id', currentPool ? currentPool.pool_id : '');
  //     formData.append('date', innerDateToSend);
  //     formData.append('file', file);

  //     // Add your upload logic here
  //     fetch('https://admin.stackinvestment.net/stackInvest-BackEnd/uploadData.php', {
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
  // };

  return (
    <div className="categoriesPage bg-white w-full h-full px-5 py-6 rounded-lg">
      {/* Upload card was here GO BACK TO keep might be needed */}
      <div className="text-2xl font-semibold text-primary mb-5 flex justify-between items-center">
        Categories
        <div className="flex items-center gap-3 justify-center">
          {/* <button className="uploudBtn"
            onClick={() => {
              setCardvisible("Upload Data");
              setErrorMessage("");
              handleUnload();
            }}
          >Uploud</button> */}
          <AddCircle
            handleClick={() => {
              navigate("/categories/add");
            }}
            size="h-8 w-8"
          />
        </div>
      </div>

      {loading ? (
        <div>Loading Categories...</div>
      ) : (
        categories && (
          <div className="flex flex-wrap gap-3">
            {categories.map((prod) => (
              <CategCard
                key={prod.id}
                id={prod.id.toString()}
                title={prod.title}
                onDelete={() => deleteProduct(prod.id.toString())}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Categ;
