import SidebarHeader from "@/components/sidebar/Sidbar";
import Order from "@/components/order/orderoverview";

const index = () => {
  return (
    <SidebarHeader>
      <Order />
    </SidebarHeader>
  );
};

export default index;
