import { useEffect, useState } from "react";
import BrandCard from "../components/BrandCard";
import axios from "axios";
import { fromJsonToBrand, BrandModel } from "../models/brand";
import AddCircle from "../icons/AddCircle";
import { useNavigate } from "react-router-dom";
import "../CSS/productManage.css";
// import X from "../assets/X.svg";

const Brand = () => {
  const [brands, setbrands] = useState<BrandModel[]>([]);
  const [loading, setLoading] = useState(true);
  // const [cardvisible, setCardvisible] = useState("");
  // const [file, setFile] = useState(null);
  // const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const fetchbrands = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "shop/brands"
      );
      const brandsData = response.data["data"].map((data: any) =>
        fromJsonToBrand(data)
      );

      setbrands(brandsData);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };
  const deleteBrand = async (id: string) => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_BASE_URL + "shop/brands/" + id
      );

      setbrands((prevBra) =>
        prevBra.filter((bra) => bra.id.toString() !== id)
      );

      console.log(response);
    } catch { }
  };

  useEffect(() => {
    fetchbrands();
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

  // const handleUpload = () => { // AA GO BACK TO removed code not needed, for BACKEND takeover
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
    <div className="brandsPage bg-white w-full h-full px-5 py-6 rounded-lg">
      {/* CardVisible was here AA GO BACK TO removed code done */}
      <div className="text-2xl font-semibold text-primary mb-5 flex justify-between items-center">
        Brands
        <div className="flex items-center gap-3 justify-center">
          {/* <button className="uploudBtn"
            onClick={() => {
              setCardvisible("Upload Data");
              setErrorMessage("");
              handleUnload();
            }}
          >Upload</button> */}
          <AddCircle
            handleClick={() => {
              navigate("/brands/add");
            }}
            size="h-8 w-8"
          />
        </div>
      </div>

      {loading ? (
        <div>Loading brands...</div>
      ) : (
        brands && (
          <div className="flex flex-wrap gap-3">
            {brands.map((bra) => (
              <BrandCard
                key={bra.id}
                id={bra.id.toString()}
                title={bra.title}
                onDelete={() => deleteBrand(bra.id.toString())}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Brand;
