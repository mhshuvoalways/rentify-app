import ProductCard from "./ProductCard";

const Products = ({ products, router }) => {
  return (
    <div className="w-10/12 m-auto my-32">
      <div className="flex justify-center sm:justify-between flex-wrap gap-5">
        {products.map((product) => {
          return product.subProducts.length ? (
            router?.query?.name ? (
              product.category.toLowerCase() === router.query.name && (
                <ProductCard
                  key={product._id}
                  productid={product._id}
                  image={product.image.url}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  stock={
                    product.subProducts.filter(
                      (subPro) => subPro.availability === "Running"
                    ).length
                  }
                />
              )
            ) : (
              <ProductCard
                key={product._id}
                productid={product._id}
                image={product.image.url}
                title={product.title}
                price={product.price}
                description={product.description}
                stock={
                  product.subProducts.filter(
                    (subPro) => subPro.availability === "Running"
                  ).length
                }
              />
            )
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Products;
