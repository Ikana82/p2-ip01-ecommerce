import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/features/product/productSlice";

export default function BannerCard() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  const topTwoProducts = products.slice(0, 2);

  return (
    <div className="w-[1440px] inline-flex justify-center items-center gap-7">
      {topTwoProducts.map((product, index) => (
        <div
          key={product.id}
          className="w-[604.93px] h-96 relative shadow-[2px_2px_10px_0px_rgba(0,0,0,0.40)]"
        >
          <img
            className="w-[604.93px] h-96 absolute rounded-xl object-cover"
            src={product.imageUrl || "https://placehold.co/605x356"}
            alt={product.category}
          />
          <div className="absolute left-7 top-[67px] text-white text-lg font-extrabold font-['Montserrat']">
            {product.category}
          </div>
          <div className="absolute left-7 top-[122px] text-white text-4xl font-extrabold font-['Core_Sans_C'] leading-10">
            Great Deals
          </div>
          <div className="absolute left-7 top-[178px] text-white text-base font-medium font-['Core_Sans_C']">
            Only at ${product.price}
          </div>
          <div className="absolute left-8 top-[245px] text-white text-xl font-extrabold underline font-['Core_Sans_C']">
            Explore Items
          </div>
        </div>
      ))}
    </div>
  );
}
