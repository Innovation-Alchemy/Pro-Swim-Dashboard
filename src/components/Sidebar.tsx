import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom"; // Assuming you are using react-router-dom
import { navLinks } from "../data";
import logo from "../../public/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function for mobile sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/login"); // Redirect to the home page
  };
  

  return (
    <>
    <div className="hidden md:block min-w-[300px] min-h-screen fixed bg-white">
      <div className="pt-10 pl-8 mb-12">
        <img src={logo} alt="Logo" />
      </div>
      <div className="pl-8 space-y-10">
        {navLinks.map(({ title, icon, activeIcon, path }, index) => (
          <NavLink
            to={path}
            key={index}
            className={({ isActive }) =>
              `flex gap-4 items-center text-lg font-semibold ${
                isActive ? "text-primary" : "text-gray-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? activeIcon : icon}
                  alt={title}
                  className="w-[35px]"
                />
                {title}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-10 pl-8 w-full">
        <button
          onClick={handleLogout}
          className="flex gap-4 items-center text-lg font-semibold text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[35px] h-[35px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6-4v8"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>

    {/* Mobile Sidebar */}
    <div className="md:hidden w-full">
      <button
        onClick={toggleSidebar}
        className="p-4 text-primary focus:outline-none"
      >
        {/* You can replace with a burger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pt-10 pl-8 mb-12">
          <img src={logo} alt="Logo" />
        </div>
        <div className="pl-8 space-y-10">
          {navLinks.map(({ title, icon, activeIcon, path }) => (
            <NavLink
              to={path}
              key={path}
              className={({ isActive }) =>
                `flex gap-4 items-center text-lg font-semibold ${
                  isActive ? "text-primary" : "text-gray-500"
                }`
              }
              onClick={() => setIsOpen(false)} // Close sidebar on link click
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? activeIcon : icon}
                    alt={title}
                    className="w-[35px]"
                  />
                  {title}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Logout Button for Mobile */}
        <div className="pl-8 mt-10">
          <button
            onClick={handleLogout}
            className="flex gap-4 items-center text-lg font-semibold text-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[35px] h-[35px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6-4v8"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for closing sidebar when clicked outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  </>
);
};

export default Sidebar;
