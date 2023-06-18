import { useState, useEffect } from "react";
import AddAndSearch from "../../AddAndSearch";
import Model from "../../Model";
import AddProduct from "./AddProduct";
import Products from "./Products";
import {
  createProduct,
  editProduct,
  deleteProduct,
  getProducts,
} from "@/store/actions/subProductAction";
import modalAction from "@/store/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";

const Index = ({ productId }) => {
  const productReducer = useSelector((store) => store.subProReducer);
  const modalReducer = useSelector((store) => store.modalReducer);
  const btnReducer = useSelector((store) => store.btnReducer);
  const [seachValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const toggleModalHandler = (id) => {
    dispatch(modalAction(id));
  };

  const addProduct = (product) => {
    const productObj = product;
    productObj.productId = productId;
    dispatch(createProduct(productObj));
  };

  const updateProduct = (product, productId) => {
    dispatch(editProduct(productId, product));
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const searchPerformHandler = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const finalProducts = () => {
    const temp = [...productReducer.products];
    const finalCategories = temp.filter((el) =>
      el.title.toLowerCase().includes(seachValue.toLowerCase())
    );
    return finalCategories;
  };

  useEffect(() => {
    dispatch(getProducts(productId));
  }, [dispatch, productId]);

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
          />
        </Model>
      )}
    </div>
  );
};

export default Index;
