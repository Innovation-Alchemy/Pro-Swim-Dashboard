import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomTable from "../components/CustomTable";
import { userHeaders } from "../data";
import { useEffect, useState } from "react";
import { fromJsonToUser, UserModel } from "../models/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserModel[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "users"
      );

      const users = response.data["data"].map((user: unknown) =>
        fromJsonToUser(user)
      );
      setUsers(users);
    } catch {
      return;
    }
  };
  const deleteUser = async ({ id }: { id: number }) => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_BASE_URL + "users/" + id
      );
      console.log(response.data);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id != id));
    } catch {
      return;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full">
      <CustomTable
        title="Users"
        headers={userHeaders}
        data={users}
        onRowClick={(row) => {
          navigate(`/users/get/${row["id"]}/orders`);
        }}
        action={[
          {
            title: "Delete",
            icon: faTrash,
            className: "text-red-600",
            onClick: (row) => {
              deleteUser({ id: row["id"] });
            },
          },
        ]}
      />
    </div>
  );
};

export default Users;
