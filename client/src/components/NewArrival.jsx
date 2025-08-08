import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Timestamp } from "firebase/firestore";

export default function NewArrival() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const productPublic = useSelector((state) => state.productPublic) || {};
  const {
    products: newArrivals = [],
    isLoading = false,
    error = null,
  } = productPublic;

  const filteredNewArrivals = useMemo(() => {
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    return newArrivals.filter((item) => {
      let createdAtDate;

      if (item.createdAt instanceof Timestamp) {
        createdAtDate = item.createdAt.toDate();
      } else if (
        typeof item.createdAt === "string" ||
        item.createdAt instanceof Date
      ) {
        createdAtDate = new Date(item.createdAt);
      } else {
        return false;
      }

      return createdAtDate >= oneMonthAgo;
    });
  }, [newArrivals]);

  if (isLoading) {
    return <p className="text-center">Loading new arrivals...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (filteredNewArrivals.length === 0) {
    return (
      <p className="text-center">No new products available at the moment.</p>
    );
  }

  return (
    <section className="w-full px-10 md:px-6 pt-15">
           {" "}
      <div className="flex items-center gap-2 mb-8 px-4">
                <div className="w-2 h-7 bg-black rounded-[10px]" />       {" "}
        <h2 className="text-xl md:text-2xl font-medium text-neutral-800">
                    New Arrival        {" "}
        </h2>
             {" "}
      </div>
           {" "}
      <div className="relative w-full">
               {" "}
        <div className="flex items-start md:items-center gap-4">
                    {/* Tombol Sebelumnya */}         {" "}
          <button className="w-10 h-10 border border-neutral-700 rounded-full flex items-center justify-center text-xl text-neutral-700 cursor-pointer shrink-0 mt-2 md:mt-0">
                        <GrFormPrevious />         {" "}
          </button>
                    {/* Grid Produk */}         {" "}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-x-6 w-full">
                       {" "}
            {filteredNewArrivals.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
              >
                               {" "}
                <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden mb-4">
                                   {" "}
                  <img
                    src={item.imageUrls?.[0] || item.imgUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                                 {" "}
                </div>
                               {" "}
                <p className="text-base md:text-lg font-medium text-gray-800 text-center">
                                    {item.name}               {" "}
                </p>
                             {" "}
              </div>
            ))}
                     {" "}
          </div>
                    {/* Tombol Selanjutnya */}         {" "}
          <button className="w-10 h-10 border border-neutral-700 rounded-full flex items-center justify-center text-xl text-neutral-700 cursor-pointer shrink-0 mt-2 md:mt-0">
                        <GrFormNext />         {" "}
          </button>
                 {" "}
        </div>
             {" "}
      </div>
         {" "}
    </section>
  );
}
