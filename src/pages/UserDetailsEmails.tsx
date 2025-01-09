import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomTable from "../components/CustomTable";
import { userEmailHeaders } from "../data";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { fromJsonToUserEmail, UserEmailModel } from "../models/user_email";

const UserDetailsEmails = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [emails, setEmails] = useState<UserEmailModel[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL +
            "feedback-and-contactus?user_id=" +
            id
        );
        const emailsData: UserEmailModel[] = response.data["data"].map(
          (data: unknown) => fromJsonToUserEmail(data)
        );

        console.log(emailsData);
        setEmails(emailsData);
      } catch {
        return;
      }
    };
    fetchEmails();
  }, [id]);

  const deleteEmail = async ({
    id,
    category,
  }: {
    id: string;
    category: string;
  }) => {
    try {
      if (category == "Feedback") {
        await axios.delete(process.env.REACT_APP_BASE_URL + "" + id);
        setEmails((prevEmails) =>
          prevEmails.filter(
            (email) => id != email.id.toString() && category == email.category
          )
        );
      } else {
        await axios.delete(process.env.REACT_APP_BASE_URL + "" + id);
        setEmails((prevEmails) =>
          prevEmails.filter(
            (email) => id != email.id.toString() && category == email.category
          )
        );
      }
    } catch {
      return;
    }
  };

  return (
    <CustomTable
      headers={userEmailHeaders}
      data={emails}
      onRowClick={(row) => {
        navigate(`/users/email/${row["id"]}/${row["category"]}`);
      }}
      action={[
        {
          title: "Delete",
          icon: faTrash,
          className: "text-red-600",

          onClick: (row) => {
            deleteEmail({ id: row["id"], category: row["category"] });
          },
        },
      ]}
    />
  );
};

export default UserDetailsEmails;
