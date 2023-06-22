const StatusFilter = ({ onStatusHandler }) => {
  return (
    <select
      className="bg-white p-2 rounded outline-0"
      name="category"
      onChange={onStatusHandler}
    >
      <option value="All">All</option>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>
  );
};

export default StatusFilter;
