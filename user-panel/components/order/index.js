import { useState, useEffect } from "react";
import Address from "./Address";
import Book from "./Book";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "@/store/actions/orderAction";
import {
  deleteBookProduct,
  updateBookProduct,
} from "@/store/actions/bookProduct";
import { useRouter } from "next/router";

const Index = () => {
  const [address, setAddress] = useState({
    name: "",
    email: "",
    villa: "",
    phone: "",
    additionalInformation: "",
  });
  const [total, setTotal] = useState(0);
  const [allProducts, setAllProducts] = useState([]);

  const router = useRouter();

  const dispatch = useDispatch();

  const bookReducer = useSelector((store) => store.bookReducer);
  const userReducer = useSelector((store) => store.userReducer);

  const createOrderHandler = () => {
    const obj = {
      shippingAddress: address,
      totalPrice: total,
      products: allProducts,
    };
    dispatch(createOrder(obj, router));
  };

  const onChangeHandler = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };

  const increaseHandler = (bookId, maxIncrement, price, quantity) => {
    if (quantity >= maxIncrement) {
      return;
    }
    const updateObj = {
      quantity: quantity + 1,
      price: (price / quantity) * (quantity + 1),
    };
    dispatch(updateBookProduct(bookId, updateObj));
  };

  const decreaseHandler = (bookId, price, quantity) => {
    if (quantity <= 1) {
      return;
    }
    const updateObj = {
      quantity: quantity - 1,
      price: (price / quantity) * (quantity - 1),
    };
    dispatch(updateBookProduct(bookId, updateObj));
  };

  useEffect(() => {
    let newTotal = 0;
    allProducts.forEach((product) => {
      newTotal += product.price;
    });
    setTotal(newTotal);
  }, [allProducts]);

  const deleteOrderProdcut = (id) => {
    dispatch(deleteBookProduct(id));
  };

  useEffect(() => {
    const tempProducts = [];
    bookReducer.bookedProdcuts.map((el) => {
      const productObj = {};
      productObj.price = el.price;
      productObj.bookId = el._id;
      productObj._id = el.product._id;
      productObj.maxIncrement = el.maxIncrement;
      productObj.title = el.product.title;
      productObj.quantity = el.quantity;
      productObj.dates = el.dates;
      tempProducts.push(productObj);
    });
    setAllProducts(tempProducts);
  }, [bookReducer.bookedProdcuts]);

  return (
    <div className="w-10/12 m-auto my-32">
      <div className="flex justify-between gap-5 flex-wrap space-y-8 md:space-y-0">
        <Address onChangeHandler={onChangeHandler} address={address} />
        <Book
          createOrderHandler={createOrderHandler}
          total={total}
          allProducts={allProducts}
          increaseHandler={increaseHandler}
          decreaseHandler={decreaseHandler}
          deleteOrderProdcut={deleteOrderProdcut}
          userReducer={userReducer}
        />
      </div>
    </div>
  );
};

export default Index;
