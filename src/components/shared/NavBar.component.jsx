import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";
import Button from "./Button.component";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    await navigate("/login");
  };

  const handleShowMenu = () => {
    const menu = document.querySelector("#navHiddenMenu");
    menu.classList.toggle("max-h-[500px]");
  };
  return (
    <nav className="mx-auto px-4 py-4 backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border-white/80 w-full max-w-screen-xl bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <p
          className="block antialiased font-sans text-gray-900 text-lg font-bold"
          onClick={() => navigate("/")}
        >
          Onzo todo app
        </p>
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            onClick={handleLogout}
            className="px-4 py-2 text-base font-normal text-white bg-red-600 rounded hover:bg-red-700 md:px-10 md:py-2 transition"
          >
            Logout
          </Button>
        </div>
        <Button
          onClick={handleShowMenu}
          className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 ml-auto inline-block lg:hidden"
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </Button>
      </div>
      <div
        id="navHiddenMenu"
        className="block w-full max-h-0 basis-full overflow-hidden transition-[max-height] duration-300 ease-in-out"
      >
        <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
          <Button
            onClick={handleLogout}
            className="px-4 py-2 w-full text-base font-normal text-white bg-red-600 rounded hover:bg-red-700 md:px-10 md:py-2 transition"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
