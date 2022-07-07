import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "My book 1",
    description: "Desc book 1",
    price: 6,
  },
  {
    id: "p2",
    title: "My book 2",
    description: "Desc book 2",
    price: 5,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((prod) => {
          return (
            <ProductItem
              key={prod.id}
              id={prod.id}
              title={prod.title}
              price={prod.price}
              description={prod.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
