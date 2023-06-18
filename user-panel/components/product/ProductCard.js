import React, { useEffect, useState } from "react";
import Image from "next/image";
import Calendar from "../clock/Calendar";
import SelectedDates from "../clock/SelectDates";
import { useDispatch, useSelector } from "react-redux";
import { bookProduct } from "@/store/actions/bookProduct";
import { getOrders } from "@/store/actions/orderAction";
import Link from "next/link";
import moment from "moment";

const ProductCard = ({
  productid,
  image,
  title,
  price,
  description,
  stock,
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [maxIncrement, setMaxIncrement] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const userReducer = useSelector((store) => store.userReducer);
  const btnReducer = useSelector((store) => store.btnReducer);
  const bookReducer = useSelector((store) => store.bookReducer);

  let findProductDates = 0;
  let findProductId = false;
  selectedDates.forEach((el) => {
    if (el.productid === productid) {
      findProductId = true;
      findProductDates++;
    }
  });

  const dispatch = useDispatch();

  const bookHandler = (productid) => {
    dispatch(
      bookProduct({
        productId: productid,
        quantity,
        price: price * quantity * findProductDates,
        maxIncrement,
        dates: selectedDates.length
          ? selectedDates.map((el) => moment(el.date).format("YYYY-MM-DD"))
          : null,
      })
    );
  };

  const findBooked = bookReducer.bookedProdcuts.find(
    (el) => el.product._id === productid
  );

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const increaseHandler = (stock) => {
    if (quantity >= stock) {
      return;
    }
    setQuantity((q) => q + 1);
  };

  const decreaseHandler = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((q) => q - 1);
  };

  const deleteDate = (id) => {
    const temp = [...selectedDates];
    const filtered = temp.filter((item) => item.id !== id);
    const findItem = temp.find((item) => item.id === id);
    setSelectedDates(filtered);
    setMaxIncrement((prev) => prev - findItem.totalQuantity);
    setQuantity((prev) => prev - findItem.totalQuantity);
  };

  useEffect(() => {
    let total = 0;
    selectedDates.forEach((date) => {
      total += date.totalQuantity;
    });
    setMaxIncrement(total);
  }, [selectedDates]);

  return (
    <div className="bg-white rounded shadow-sm space-y-3 px-5 py-2 hover:shadow w-full md:product_card">
      <Image
        src={image}
        className="rounded"
        alt={title}
        width={500}
        height={500}
        unoptimized
      />
      <p className="text-xl font-medium">{title}</p>
      <div className="font-medium border py-2 px-2 space-y-5">
        <div>
          <div className="border flex gap-4 p-1">
            <p>Date:</p>
            <Calendar
              productid={productid}
              stock={stock}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </div>
          {findProductId && (
            <SelectedDates
              deleteDate={deleteDate}
              selectedDates={selectedDates}
              productid={productid}
            />
          )}
        </div>
        <div className="flex gap-5 sm:justify-between items-center flex-wrap justify-center">
          <p>${price * quantity * findProductDates}</p>
          <div className="flex gap-5">
            <button onClick={decreaseHandler} className="border px-2">
              -
            </button>
            <p>{`${quantity}`}</p>
            <button
              onClick={() => increaseHandler(maxIncrement)}
              className="border px-2"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <p>{description}</p>
      <p>
        {userReducer.isAuthenticate ? (
          !findBooked && btnReducer ? (
            <button
              className={`w-full bg-indigo-900 text-white py-2 hover:bg-indigo-800 text-xl`}
              onClick={() => bookHandler(productid)}
            >
              Book
            </button>
          ) : (
            <button
              className={`w-full bg-gray-600 cursor-not-allowed opacity-50 text-white py-2 text-xl`}
            >
              Book
            </button>
          )
        ) : (
          <Link href="/login">
            <button
              className={`w-full bg-indigo-900 text-white py-2 hover:bg-indigo-800 text-xl`}
            >
              Book
            </button>
          </Link>
        )}
      </p>
    </div>
  );
};

export default ProductCard;
