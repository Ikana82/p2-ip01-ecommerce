import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function NewArrival() {
  const items = [
    {
      title: "Knitted Joggers",
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/461420/item/idgoods_63_461420_3x4.jpg?width=294",
    },
    {
      title: "Full Sleeve",
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/474402/item/idgoods_10_474402_3x4.jpg?width=294",
    },
    {
      title: "Active T-Shirts",
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/480940/item/idgoods_01_480940_3x4.jpg?width=294",
    },
    {
      title: "Urban Shirts",
      image:
        "https://image.uniqlo.com/UQ/ST3/id/imagesgoods/475651/item/idgoods_54_475651_3x4.jpg?width=294",
    },
  ];

  return (
    <>
      <section className="w-full px-4 md:px-6 pt-15">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-7 bg-black rounded-[10px]" />
          <h2 className="text-xl md:text-2xl font-medium text-neutral-800">
            New Arrival
          </h2>
        </div>

        <div className="relative w-full">
          <div className="flex items-start md:items-center gap-4">
            {/* Prev */}
            <button className="w-10 h-10 border border-neutral-700 rounded-full flex items-center justify-center text-xl text-neutral-700 cursor-pointer shrink-0 mt-2 md:mt-0">
              <GrFormPrevious />
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-x-6 w-full">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                >
                  <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden mb-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-base md:text-lg font-medium text-gray-800 text-center">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Next */}
            <button className="w-10 h-10 border border-neutral-700 rounded-full flex items-center justify-center text-xl text-neutral-700 cursor-pointer shrink-0 mt-2 md:mt-0">
              <GrFormNext />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
