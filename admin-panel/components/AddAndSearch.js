const AddAndSearch = ({ toggleModalHandler, order, searchPerformHandler }) => {
  return (
    <div className="flex justify-between gap-3 flex-wrap">
      {order ? null : (
        <button
          className="bg-blue-500 p-2 sm:w-48 text-white rounded text-xl w-full"
          onClick={() => toggleModalHandler()}
        >
          Add
        </button>
      )}
      <input
        type="text"
        className="p-2 outline-0 rounded sm:w-48 w-full"
        placeholder="Search..."
        onChange={searchPerformHandler}
      />
    </div>
  );
};

export default AddAndSearch;
