import Image from "next/image";
import Link from "next/link";

const CategoryBox = ({ name, image }) => {
  return (
    <Link
      href={`/products/${name.toLowerCase()}`}
      className="sm:w-56 w-full flex justify-between gap-3 border border-gray-100 p-3 rounded items-center bg-white hover:shadow-sm "
    >
      <p>{name}</p>
      <Image
        src={image}
        className="w-10"
        alt={name}
        unoptimized
        width={50}
        height={50}
      />
    </Link>
  );
};

export default CategoryBox;
