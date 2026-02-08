import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.slug}`}>
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white">
        <img
          src={product.images[0]}
          alt={product.title}
          className="aspect-square object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 truncate">
            {product.title}
          </h3>

          <p className="line-clamp-2 text-gray-500 text-sm mt-1 mb-3">
            {product.description}
          </p>

          <p className="text-primary font-bold text-lg">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
