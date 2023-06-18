import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Categories from "@/components/category/Categories";

const Index = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/category/getcates")
      .then((response) => setCategories(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <Categories categories={categories} />
      <Footer />
    </div>
  );
};

export default Index;
