import SidebarHeader from "@/components/sidebar/Sidbar";
import OrderDetails from "@/components/order/orderdetails";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  return (
    <SidebarHeader>
      <OrderDetails orderId={router.query.orderid} />
    </SidebarHeader>
  );
};

export default index;
