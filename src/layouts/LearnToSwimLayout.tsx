import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const LearnToSwimLayout = () => {
  return (
    <div className="w-full md:ml-[300px]">
      <Navbar
        links={[
          { title: "Levels", path: "/learn-to-swim" },
          { title: "Call Schedule", path: "/" },
          { title: "Progress Monitoring", path: "/" },
        ]}
      />
      <div className="flex xl:flex-row flex-col gap-3 my-3 mx-3">
        <Outlet />
      </div>
    </div>
  );
};

export default LearnToSwimLayout;
