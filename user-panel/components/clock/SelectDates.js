import moment from "moment";

const SelectedDates = ({ selectedDates, deleteDate, productid }) => {
  return (
    <div className="border p-3 w-full">
      <p className="font-semibold">Selected Dates:</p>
      {selectedDates.map(
        (date) =>
          date.productid === productid && (
            <div
              key={date.id}
              className="flex justify-between border-b items-center gap-1 mt-3 flex-wrap pb-1 text-sm"
            >
              <p>{moment(date.date).format("YYYY-MM-DD")}</p>
              <i
                className="fa-regular fa-trash-can cursor-pointer"
                onClick={() => deleteDate(date.id)}
              ></i>
            </div>
          )
      )}
    </div>
  );
};

export default SelectedDates;