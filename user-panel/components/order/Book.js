import Link from "next/link";

const Book = ({
  createOrderHandler,
  total,
  allProducts,
  increaseHandler,
  decreaseHandler,
  deleteOrderProdcut,
  userReducer,
}) => {
  return (
    <div className="w-full md:w-5/12">
      <p className="text-xl mb-10 font-semibold">Your order</p>
      <div className="bg-white py-10 px-5 rounded">
        <div className="flex justify-between text-xl mb-5">
          <p>Name</p>
          <p>Total</p>
        </div>
        <div className="py-8 border-t border-gray-400 border-b space-y-2">
          {allProducts.length ? (
            allProducts.map((pro) => (
              <div key={pro.bookId} className="border p-4 space-y-4">
                <div className="flex justify-between gap-5 flex-wrap">
                  <p>
                    {`${pro.title.slice(0, 20)}...`} X {pro.quantity}
                  </p>
                  <p className="mb-5">${pro.price}</p>
                </div>
                <div className="flex justify-between gap-5 flex-wrap text-green-600 text-sm">
                  <p className="font-semibold">Date:</p>
                  <div>
                    {pro.dates.map((date) => (
                      <p key={date}>{date}</p>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between gap-2 items-center flex-wrap">
                  <div className="flex gap-5">
                    <button
                      onClick={() =>
                        decreaseHandler(pro.bookId, pro.price, pro.quantity)
                      }
                      className="border px-2"
                    >
                      -
                    </button>
                    <p>{pro.quantity}</p>
                    <button
                      onClick={() =>
                        increaseHandler(
                          pro.bookId,
                          pro.maxIncrement,
                          pro.price,
                          pro.quantity
                        )
                      }
                      className="border px-2"
                    >
                      +
                    </button>
                  </div>
                  <i
                    className="fa-regular fa-trash-can cursor-pointer"
                    onClick={() => deleteOrderProdcut(pro.bookId)}
                  ></i>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xl">There is no product</p>
          )}
        </div>
        <div className="flex justify-between text-xl mt-5">
          <p>Total</p>
          <p>${total}</p>
        </div>
      </div>
      {userReducer.isAuthenticate ? (
        <button
          className="bg-indigo-900 text-white py-3 w-full hover:bg-indigo-800 mt-10 rounded-full"
          onClick={createOrderHandler}
        >
          CONFIRM AND PAY
        </button>
      ) : (
        <Link href="/login">
          <button
            className="bg-indigo-900 text-white py-3 w-full hover:bg-indigo-800 mt-10 rounded-full"
            onClick={createOrderHandler}
          >
            CONFIRM AND PAY
          </button>
        </Link>
      )}
    </div>
  );
};

export default Book;
