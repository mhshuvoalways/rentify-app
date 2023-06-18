import { useEffect, useState } from "react";
import AddAndSearch from "../AddAndSearch";
import Category from "./Category";
import Model from "../Model";
import AddCategory from "./AddCategory";
import {
  createCategory,
  getCategoires,
  deleteCategory,
  editCategory,
} from "@/store/actions/categoryAction";
import modalAction from "@/store/actions/modalAction";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const categoryReducer = useSelector((store) => store.categoryReducer);
  const modalReducer = useSelector((store) => store.modalReducer);
  const btnReducer = useSelector((store) => store.btnReducer);
  const [seachValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  const toggleModalHandler = (id) => {
    dispatch(modalAction(id));
  };

  const addCategory = (category) => {
    const formData = new FormData();
    formData.append("image", category.image);
    formData.append("name", category.name);
    dispatch(createCategory(formData));
  };

  const updateCategory = (category, catid) => {
    const formData = new FormData();
    category.image
      ? formData.append("image", category.image)
      : formData.append("imageUrl", category.imageUrl);
    formData.append("name", category.name);
    dispatch(editCategory(catid, formData));
  };

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const searchPerformHandler = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const finalCategories = () => {
    const temp = [...categoryReducer.categories];
    const finalCategories = temp.filter((el) =>
      el.name.toLowerCase().includes(seachValue.toLowerCase())
    );
    return finalCategories;
  };

  useEffect(() => {
    dispatch(getCategoires());
  }, [dispatch]);

  return (
    <div>
      <AddAndSearch
        toggleModalHandler={toggleModalHandler}
        searchPerformHandler={searchPerformHandler}
      />
      <Category
        toggleModalHandler={toggleModalHandler}
        categories={finalCategories()}
        deleteCategory={deleteCategoryHandler}
      />
      {modalReducer.toggle && (
        <Model toggleModalHandler={toggleModalHandler} title="Add Category">
          <AddCategory
            addCategory={addCategory}
            allcategories={categoryReducer.categories}
            categoryId={modalReducer.id}
            updateCategory={updateCategory}
            btnReducer={btnReducer}
          />
        </Model>
      )}
    </div>
  );
};

export default Index;
