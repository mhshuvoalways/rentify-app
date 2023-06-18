import CategoryBox from "./CategoryBox";

const Categories = ({ categories }) => {
  return (
    <div className="w-10/12 m-auto my-32">
      <div className="flex justify-center md:justify-between items-center flex-wrap gap-5">
        {categories?.map((category) => (
          <CategoryBox
            name={category.name}
            image={category.image.url}
            key={category._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
