import { GrFavorite } from "react-icons/gr";
import { TbShoppingBagPlus } from "react-icons/tb";
import { MdOutlineStarPurple500 } from "react-icons/md";

const products = [
  {
    img: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/476248/item/idgoods_69_476248_3x4.jpg?width=369",
    title: "Mini Striped T-Shirt (Cropped Top)",
    rating: 4.5,
    reviews: 88,
    price: "$123.00",
  },
  {
    img: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/465755/item/idgoods_58_465755_3x4.jpg?width=294",
    title: "AIRism Cotton T-Shirt",
    rating: 4.2,
    reviews: 56,
    price: "$37.00",
  },
  {
    img: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/450259/item/idgoods_69_450259_3x4.jpg?width=369",
    title: "Oxford Shirt | Long Sleeve Regular Fit",
    rating: 4.7,
    reviews: 132,
    price: "$37.00",
  },
  {
    img: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/476997/item/idgoods_32_476997_3x4.jpg?width=369",
    title: "Washable Knitted Polo Sweater Short Sleeve",
    rating: 4.9,
    reviews: 211,
    price: "$119.00",
  },
];

export default function TheLimelight() {
  return (
    <>
      <section className="w-full px-4 md:px-6 pt-15">
        {/* Title */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-7 bg-black rounded-[10px]" />
          <h2 className="text-xl md:text-2xl font-medium text-neutral-800">
            In The Limelight
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="md:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start gap-1 bg-white"
              >
                {/* Image + Favorite */}
                <div className="relative w-full">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-80 object-cover rounded-[10px]"
                  />
                  <button className="absolute top-3 right-3 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow hover:bg-neutral-100 transition">
                    <GrFavorite className="text-neutral-600 text-lg" />
                  </button>
                </div>

                {/* Detail Section */}
                <div className="self-stretch h-36 px-2 py-1 inline-flex flex-col justify-start items-start gap-2">
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-zinc-900 text-base md:text-lg font-medium">
                      {product.title}
                    </p>
                    <div className="flex items-center gap-1 text-zinc-500 text-sm font-medium">
                      <div className="flex items-center gap-1.5">
                        <MdOutlineStarPurple500 className="w-4 h-4 text-yellow-500" />
                        <span>{product.rating}</span>
                      </div>
                      <span>({product.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-zinc-900 text-base font-medium">
                      {product.price}
                    </p>
                    <button className="w-10 h-10 rounded-lg shadow-inner shadow-white/10 outline-gray-300 flex justify-center items-center hover:bg-gray-100 transition">
                      <TbShoppingBagPlus className="w-6 h-6 text-neutral-800" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
