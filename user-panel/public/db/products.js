import Breakfast from "../products/breakfast.jpg";
import Bus from "../products/car.jpg";

const products = [
  {
    id: 1,
    image: Breakfast,
    title: "Light lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: "352",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui augue, interdum sed risus at, tristique rhoncus felis. Vestibulum malesuada lacus erat, ut fermentum tortor gravida ut. Morbi lacus erat, interdum et feugiat id, ultricies et nisl. Quisque ut nisi sed nulla molestie elementum. Curabitur porta risus velit, non placerat turpis efficitur ut.",
    stock: 10,
    category: "breakfast",
    type: "light",
  },
  {
    id: 2,
    image: Bus,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: "352",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui augue, interdum sed risus at, tristique rhoncus felis. Vestibulum malesuada lacus erat, ut fermentum tortor gravida ut. Morbi lacus erat, interdum et feugiat id, ultricies et nisl. Quisque ut nisi sed nulla molestie elementum. Curabitur porta risus velit, non placerat turpis efficitur ut.",
    stock: 5,
    category: "bike",
    type: "mountain",
  },
  {
    id: 3,
    image: Breakfast,
    title: "Bio lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: "352",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui augue, interdum sed risus at, tristique rhoncus felis. Vestibulum malesuada lacus erat, ut fermentum tortor gravida ut. Morbi lacus erat, interdum et feugiat id, ultricies et nisl. Quisque ut nisi sed nulla molestie elementum. Curabitur porta risus velit, non placerat turpis efficitur ut.",
    stock: 2,
    category: "breakfast",
    type: "bio",
  },
  {
    id: 4,
    image: Bus,
    title: "Road lorem ipsum dolor sit amet, consectetur adipiscing elit",
    price: "352",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui augue, interdum sed risus at, tristique rhoncus felis. Vestibulum malesuada lacus erat, ut fermentum tortor gravida ut. Morbi lacus erat, interdum et feugiat id, ultricies et nisl. Quisque ut nisi sed nulla molestie elementum. Curabitur porta risus velit, non placerat turpis efficitur ut.",
    stock: 7,
    category: "bike",
    type: "road",
  },
];

export default products;
