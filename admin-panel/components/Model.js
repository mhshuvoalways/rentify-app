const Modal = ({ children, toggleModalHandler, title }) => {
  return (
    <div>
      <div className="fixed inset-y-20 inset-x-10 z-50">
        <div className="bg-white shadow-lg rounded-lg w-full md:w-6/12 mx-auto h-5/6 overflow-y-auto modal">
          <div className="text-xl font-semibold">
            <div className="flex justify-between items-center gap-3 flex-wrap border-b px-10 py-5">
              <p>{title}</p>
              <p onClick={toggleModalHandler} className="cursor-pointer">
                ✕
              </p>
            </div>
          </div>
          <div>
            <div className="px-10 py-10">{children}</div>
          </div>
        </div>
      </div>
      <p
        className="fixed inset-0 bg-gray-700 opacity-50 z-20"
        onClick={toggleModalHandler}
      ></p>
    </div>
  );
};

export default Modal;
