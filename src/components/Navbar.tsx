import { NavLink } from "react-router-dom";
import avatarIcon from "../../public/avatar.svg";

const Navbar = ({ links }: { links: { title: string; path: string }[] }) => {
  return (
    <div className="flex md:mx-3 mx-2 md:mt-8  h-[70px] rounded-lg bg-white justify-between items-center px-6">
      <div className="text-primary text-lg font-semibold flex gap-3">
        {links.map(({ title, path }, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              `${isActive ? "text-primary" : " text-gray-600"}`
            }
          >
            {title}
          </NavLink>
        ))}
      </div>
      <div className="flex gap-3 items-center h-full py-3">
        <div className="w-[1px] h-full bg-black"></div>
        <div className="text-lg text-primary font-semibold">Katie Coleman</div>
        <div className="">
          <img
            src={avatarIcon}
            alt="Avatar"
            className="rounded-full h-[40px] aspect-square bg-secondary pt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
