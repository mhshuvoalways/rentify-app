const Customer = ({ user, lastAddress }) => {
  return (
    <div className="w-full sm:w-4/12">
      <div className="bg-white p-4 rounded">
        <p className="text-xl font-semibold">Customer</p>
        <div className="mt-3">
          <p className="text-lg">{user?.name}</p>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded mt-10">
        <p className="text-xl font-semibold">Last Shipping Address</p>
        <div className="mt-3 space-y-1">
          <p>{lastAddress?.shippingAddress?.name}</p>
          <p className="text-sm">{lastAddress?.shippingAddress?.email}</p>
          <p className="text-sm">{lastAddress?.shippingAddress?.villa}</p>
          <p className="text-sm">{lastAddress?.shippingAddress?.phone}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded mt-10">
        <p className="text-xl font-semibold">Payment Method</p>
        <div className="mt-3">
          <p>Method: {lastAddress?.paymentMethod.cash}</p>
          <p className="text-sm">
            Transaction No: #{lastAddress?.paymentMethod.tranId.substr(-5)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Customer;
