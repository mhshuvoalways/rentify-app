const StatusFilter = () => {
  return (
    <select className="bg-white p-2 rounded outline-0" name="category">
      <option>All</option>
      <option>Status</option>
      <option>Pending</option>
      <option>Shipped</option>
      <option>Canceled</option>
    </select>
  );
};

export default StatusFilter;
