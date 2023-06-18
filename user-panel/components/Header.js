import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout, isAuthenticate } from "../store/actions/userAction";
import { getBookProduct } from "../store/actions/bookProduct";

const Header = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);
  const bookReducer = useSelector((store) => store.bookReducer);
  const router = useRouter();

  useEffect(() => {
    userReducer.isAuthenticate && dispatch(getBookProduct());
  }, [dispatch, userReducer.isAuthenticate]);

  useEffect(() => {
    dispatch(isAuthenticate(router));
  }, [dispatch]);

  return (
    <div className="bg-white shadow-sm">
      <div className="w-10/12 m-auto gap-5 flex justify-between items-center py-6 flex-wrap">
        <Link href="/" className="font-bold text-xl">
          RentMe
        </Link>
        <menu className="flex gap-5 sm:gap-10 flex-wrap">
          <Link href="/" className="font-semibold hover:text-indigo-700">
            Home
          </Link>
          <Link
            href="/products"
            className="font-semibold hover:text-indigo-700"
          >
            <p>Products</p>
          </Link>
          <Link
            href="/book"
            className="font-semibold hover:text-indigo-700 flex"
          >
            <p>Booked</p>
            <small>({bookReducer.bookedProdcuts.length})</small>
          </Link>
          <Link
            href="/myaccount"
            className="font-semibold hover:text-indigo-700"
          >
            <p>My Account</p>
          </Link>
          {userReducer.isAuthenticate ? (
            <div
              className="font-semibold hover:text-indigo-700 cursor-pointer"
              onClick={() => dispatch(logout(router))}
            >
              Logout
            </div>
          ) : (
            <Link href="/login" className="font-semibold hover:text-indigo-700">
              Login
            </Link>
          )}
        </menu>
      </div>
    </div>
  );
};

export default Header;
