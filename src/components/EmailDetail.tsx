import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fromJsonToUserEmail, UserEmailModel } from "../models/user_email";
import Button from "./Button";

const EmailDetail = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const [email, setEmail] = useState<UserEmailModel>();

  const fetchEmail = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL +
          `${category == "Feedback" ? "feedback?id=" : "contact-us?id="}` +
          id
      );

      setEmail(fromJsonToUserEmail({ ...response.data["data"][0], category }));
    } catch {
      return;
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white p-7 rounded-lg h-full flex flex-col">
        <div className="text-xl text-primary font-semibold">Email Details</div>
        <div>
          <div>Name: {email?.name}</div>
          <div>Email: {email?.email}</div>
          <div>Category: {email?.category}</div>

          <Button
            title="Click"
            onClick={() => {
              console.log(email);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
