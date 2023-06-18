import SidebarHeader from "@/components/sidebar/Sidbar";
import Product from "@/components/product/allProducts";

const index = () => {
  return (
    <SidebarHeader>
      <Product />
    </SidebarHeader>
  );
};

export default index;
