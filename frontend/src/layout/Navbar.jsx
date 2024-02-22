import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Avatar from "../ui/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { IoMdExit } from "react-icons/io";
import { logout } from "../store/slices/userAuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white px-4 border-gray-200">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-12" alt="Logo" />
          <p className="font-semibold text-xl">Todo App</p>
        </Link>
        <div className="flex flex-row items-center">
          <span className="hidden lg:block mr-4 font-medium">
            Hello, {user?.name}
          </span>
          <Avatar />
          <button onClick={() => dispatch(logout())}>
            <IoMdExit className="text-2xl text-gray-500" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
