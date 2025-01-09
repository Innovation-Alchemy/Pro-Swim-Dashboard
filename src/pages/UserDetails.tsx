import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import pfp from "../../public/profile-picture-normal.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { fromJsonToUser, UserModel } from "../models/user";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserModel[]>([]);
//   const [user, setUser] = useState();

  const deleteUser = async ({ id }: { id: string }) => {
    try {
      await axios.delete(process.env.REACT_APP_BASE_URL + "users/" + id);
      navigate("/users", { replace: true });
    } catch {
      return;
    }
  };
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

  useEffect(() => {
    fetchUsers();
  }, []);

  const user = users.find((user) => user.id.toString() === id);
  const email = user ? user.email : "Email not found";
  return (
    <div className="w-full">
      <div className="bg-white p-7 rounded-lg h-full flex flex-col">
        <div className="text-xl text-primary font-semibold">User's Details</div>
        <div className="sm:m-6 mt-6 flex sm:flex-row flex-col items-center gap-5 relative w-full">
          <img src={pfp} alt="" height={120} width={120} />
          <div className="flex items-center text-center gap-3">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-3xl text-gray-600"
            />
            <div className="text-2xl text-gray-600">{email}</div>
          </div>
          <div
            className="absolute sm:right-12 right-2 text-2xl text-red-600"
            onClick={() => deleteUser({ id: id! })}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
        </div>
        <div className="flex gap-3 relative">
          <div className="w-full h-[2px] bg-gray-400 absolute bottom-0 "></div>
          <NavLink
            to={`/users/get/${id}/orders`}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-primary  border-primary"
                  : " text-gray-400 border-gray-400"
              } text-lg font-semibold border-b-[2px] z-10`
            }
          >
            Orders
          </NavLink>
          {/* <NavLink
            to={`/users/get/${id}/emails`}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-primary border-primary"
                  : " text-gray-400  border-gray-400"
              } text-lg font-semibold border-b-[2px] z-10`
            }
          >
            Email
          </NavLink> */}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserDetails;
