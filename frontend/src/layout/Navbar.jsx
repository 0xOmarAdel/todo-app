import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Avatar from "../ui/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { IoMdExit } from "react-icons/io";
import { logout } from "../store/slices/userAuthSlice";
import Modal from "../ui/Modal";
import UserForm from "../components/UserForm";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white px-4 border-gray-200">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-12" alt="Logo" />
          <p className="text-2xl text-gray-700 font-semibold">Todo App</p>
        </Link>
        <div className="flex flex-row items-center gap-2">
          <div className="hidden lg:flex lg:flex-row lg:items-center lg:gap-2">
            <span className="text-lg font-medium">Hello, {user?.name}</span>
            <Avatar onClick={() => setIsModalOpen(true)} />
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
              <UserForm setIsModalOpen={setIsModalOpen} />
            </Modal>
          </div>
          <button onClick={() => dispatch(logout())}>
            <IoMdExit className="text-2xl text-gray-500" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
