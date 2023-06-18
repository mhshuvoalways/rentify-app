import { useRouter } from "next/router";
import SidebarHeader from "@/components/sidebar/Sidbar";
import Product from "@/components/product/singleProducts";

const index = () => {
  const router = useRouter();

  return (
    <SidebarHeader>
      <Product productId={router.query.productid} />
    </SidebarHeader>
  );
};

export default index;
