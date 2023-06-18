import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { isAuthenticate, logout } from "@/store/actions/userAction";

const SidebarHeader = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(isAuthenticate(router));
  }, [dispatch, router]);

  return (
    <div>
      <div className="bg-white shadow w-full">
        <div className="py-5 flex justify-between items-center px-10">
          <Link href="/" className="text-xl font-semibold">
            RentMe
          </Link>
          <button className="text-2xl flex justify-end" onClick={toggleSidebar}>
            {isOpen ? "☰" : "✕"}
          </button>
        </div>
      </div>
      <div className="flex border-t">
        <div
          className={`bg-white h-screen transform transition-all duration-300 shadow-lg absolute md:static z-10 ${
            isOpen
              ? "translate-x-0 w-full sm:w-56"
              : "-translate-x-full w-0 opacity-0"
          }`}
        >
          <ul className="list-none my-10">
            <li>
              <Link href="/">
                <p className="hover:text-blue-700 font-semibold hover:bg-gray-50 py-3 pl-10">
                  Dashboard
                </p>
              </Link>
            </li>
            <li>
              <Link href="/category">
                <p className="hover:text-blue-700 font-semibold hover:bg-gray-50 py-3 pl-10">
                  Categories
                </p>
              </Link>
            </li>
            <li>
              <Link href="/product">
                <p className="hover:text-blue-700 font-semibold hover:bg-gray-50 py-3 pl-10">
                  Products
                </p>
              </Link>
            </li>
            <li>
              <Link href="/order">
                <p className="hover:text-blue-700 font-semibold hover:bg-gray-50 py-3 pl-10">
                  Orders
                </p>
              </Link>
            </li>
            <li>
              <Link href="/user">
                <p className="hover:text-blue-700 font-semibold hover:bg-gray-50 py-3 pl-10">
                  Users
                </p>
              </Link>
            </li>
            <li onClick={() => dispatch(logout(router))}>
              <p className="hover:text-blue-700 font-semibold hover:bg-gray-50 py-3 pl-10 cursor-pointer">
                Logout
              </p>
            </li>
          </ul>
        </div>
        <div className={`px-10 my-10 w-full`}>{children}</div>
      </div>
    </div>
  );
};

export default SidebarHeader;
