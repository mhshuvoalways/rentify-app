import { useState, useEffect } from "react";
import AddAndSearch from "../../AddAndSearch";
import Model from "../../Model";
import AddProduct from "../allProducts/AddProduct";
import Products from "./Products";
import {
  createProduct,
  editProduct,
  deleteProduct,
  getProducts,
} from "@/store/actions/productAction";
import { getCategoires } from "@/store/actions/categoryAction";
import modalAction from "@/store/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const productReducer = useSelector((store) => store.productReducer);
  const modalReducer = useSelector((store) => store.modalReducer);
  const categoryReducer = useSelector((store) => store.categoryReducer);
  const btnReducer = useSelector((store) => store.btnReducer);
  const [seachValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const toggleModalHandler = (id) => {
    dispatch(modalAction(id));
  };

  const addProduct = (product) => {
    const formData = new FormData();
    formData.append("image", product.image);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    dispatch(createProduct(formData));
  };

  const updateProduct = (product, productId) => {
    const formData = new FormData();
    product.image
      ? formData.append("image", product.image)
      : formData.append("imageUrl", product.imageUrl);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    dispatch(editProduct(productId, formData));
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const searchPerformHandler = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const finalProducts = () => {
    const temp = [...productReducer?.products];
    const finalCategories = temp.filter((el) =>
      el.title.toLowerCase().includes(seachValue.toLowerCase())
    );
    return finalCategories;
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategoires());
  }, [dispatch]);

  return (
    <div>
      <AddAndSearch
        toggleModalHandler={toggleModalHandler}
        searchPerformHandler={searchPerformHandler}
      />
      <Products
        toggleModalHandler={toggleModalHandler}
        products={finalProducts()}
        deleteProduct={deleteProductHandler}
      />
      {modalReducer.toggle && (
        <Model toggleModalHandler={toggleModalHandler} title="Add Product">
          <AddProduct
            addProduct={addProduct}
            allproducts={productReducer.products}
            productId={modalReducer.id}
            updateProduct={updateProduct}
            btnReducer={btnReducer}
            categories={categoryReducer.categories}
          />
        </Model>
      )}
    </div>
  );
};

export default Index;
