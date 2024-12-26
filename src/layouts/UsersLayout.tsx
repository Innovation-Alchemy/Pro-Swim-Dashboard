import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const UsersLayout = () => {
  return (
    <div className="w-full md:ml-[300px]">
      <Navbar links={[{ title: "Details", path: "/users" }]} />
      <div className="flex xl:flex-row flex-col gap-3 my-3 mx-3">
        <Outlet />
      </div>
    </div>
  );
};

export default UsersLayout;
