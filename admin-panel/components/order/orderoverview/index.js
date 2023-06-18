import Orders from "./Orders";
import Calendar from "@/components/Calendar";
import StatusFilter from "@/components/order/orderoverview/StatusFilter";

const Index = () => {
  return (
    <div>
      <div className="flex gap-5 justify-between items-center">
        <Calendar />
        <StatusFilter />
      </div>
      <Orders />
    </div>
  );
};

export default Index;
