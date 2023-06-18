import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Products from "@/components/product";
import axios from "axios";
import { useEffect, useState } from "react";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/product/getproducts")
      .then((response) => {
        setProducts(response.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <Products products={products} />
      <Footer />
    </div>
  );
};

export default Product;
