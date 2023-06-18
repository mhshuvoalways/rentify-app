const Address = ({ address, onChangeHandler }) => {
  return (
    <form className="w-full md:w-6/12">
      <p className="font-semibold text-xl">Provide your address</p>
      <div className="flex justify-between gap-5 mt-10 flex-wrap sm:flex-nowrap">
        <div className="w-full">
          <label className="grid">
            <p className="font-medium">Name</p>
            <input
              type="text"
              className="bg-white focus:ring outline-0 rounded py-3 w-full px-2 mt-2"
              value={address.name}
              onChange={onChangeHandler}
              name="name"
            />
          </label>
        </div>
        <div className="w-full">
          <label className="grid">
            <p className="font-medium">Email</p>
            <input
              type="email"
              className="bg-white focus:ring outline-0 rounded py-3 w-full px-2 mt-2"
              value={address.email}
              onChange={onChangeHandler}
              name="email"
            />
          </label>
        </div>
      </div>
      <div className="flex justify-between gap-5 mt-10 flex-wrap sm:flex-nowrap">
        <div className="w-full">
          <label className="grid">
            <p className="font-medium">Villa Number</p>
            <input
              type="number"
              className="bg-white focus:ring outline-0 rounded py-3 w-full px-2 mt-2"
              value={address.villa}
              onChange={onChangeHandler}
              name="villa"
            />
          </label>
        </div>
        <div className="w-full">
          <label className="grid">
            <p className="font-medium">Phone</p>
            <input
              type="number"
              className="bg-white focus:ring outline-0 rounded py-3 w-full px-2 mt-2"
              value={address.phone}
              onChange={onChangeHandler}
              name="phone"
            />
          </label>
        </div>
      </div>
      <div className="w-full mt-10">
        <label className="grid">
          <p className="font-medium">Additional information (optional)</p>
          <textarea
            className="bg-white focus:ring outline-0 rounded py-3 h-32 w-full px-2 mt-2"
            value={address.additionalInformation}
            onChange={onChangeHandler}
            name="additionalInformation"
          />
        </label>
      </div>
    </form>
  );
};

export default Address;
