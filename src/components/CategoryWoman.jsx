import { GrFormNext, GrFormPrevious, GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router";

const categories = [
  {
    title: "Hoodies & Sweetshirt",
    subTitle: "Explore Now!",
    img: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/456261/item/idgoods_61_456261_3x4.jpg?width=294",
  },
  {
    title: "Coats & Parkas",
    subTitle: "Explore Now!",
    img: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/478581/item/idgoods_06_478581_3x4.jpg?width=294",
  },
  {
    title: "Tees & T-Shirt",
    subTitle: "Explore Now!",
    img: "https://i.pinimg.com/1200x/ba/c8/d6/bac8d68319cbdd55e2591eaa46382e58.jpg",
  },
  {
    title: "Trousers",
    subTitle: "Explore Now!",
    img: "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/479292/item/idgoods_30_479292_3x4.jpg?width=294",
  },
];

export default function CategoryWoman() {
  return (
    <section className="w-full px-4 md:px-6 py-10">
      {/* Title */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-2 h-7 bg-purple-600 rounded-[10px]" />
        <h2 className="text-xl md:text-3xl font-semibold text-neutral-800">
          Categories For Women
        </h2>
      </div>

      {/* Content with arrows */}
      <div className="relative w-full">
        <div className="flex items-center justify-between gap-4">
          {/* Prev */}
          <button className="w-10 h-10 border border-neutral-700 rounded-full flex items-center justify-center text-xl text-neutral-700 cursor-pointer">
            <GrFormPrevious />
          </button>

          {/* Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
            {categories.map((item, index) => (
              <div key={index} className="flex flex-col items-start gap-3">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[24rem] object-cover rounded-[10px]"
                />
                <div className="flex justify-between items-center w-full gap-4">
                  <div>
                    <p className="text-zinc-900 text-base md:text-lg font-medium ">
                      {item.title}
                    </p>
                    <p className="text-zinc-500 text-sm font-medium">
                      {item.subTitle}
                    </p>
                  </div>
                  {/* <div className="w-4 h-0 border-[1.68px] border-neutral-500" /> */}
                  <Link
                    to={`/category/${item.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <GrFormNextLink className="text-xl text-neutral-700 hover:text-purple-600 transition" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Next */}
          <button className="w-10 h-10 border border-neutral-700 rounded-full flex items-center justify-center text-xl text-neutral-700 cursor-pointer">
            <GrFormNext />
          </button>
        </div>
      </div>
    </section>
  );
}
