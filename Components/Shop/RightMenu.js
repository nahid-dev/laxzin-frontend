import Loader from "../Loader";
import ProductCard from "../ProductDetails/ProductCard";

const RightMenu = ({ products, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <div className="h-[400px] md:h-[200px] sm:h-[170px] lg:h-[300px] xls:h-[140px] xms:h-[130px] xs:h-[120px] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-2">
            <Loader />
            <span className="text-sm tracking-wide text-gray-500">
              Loading, please wait...
            </span>
          </div>
        </div>
      ) : products?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8">
          {products?.map((product, index) => (
            <ProductCard item={product} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
          <svg
            className="w-16 h-16 text-gray-400 animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0h-3"
            />
          </svg>
          <span className="text-xl font-semibold text-gray-700">
            No Products Found
          </span>
          <p className="text-sm text-gray-500">
            We couldn't find any results matching your search. Try adjusting
            your filters or search again.
          </p>
        </div>
      )}
    </div>
  );
};

export default RightMenu;
