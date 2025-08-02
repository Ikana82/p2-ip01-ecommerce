import { IoIosStar } from "react-icons/io";

function Review() {
  return (
    <div className="w-[612px] flex flex-col gap-7">
      {/* Header Review */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-7 bg-purple-600 rounded-[10px]" />
          <h2 className="text-neutral-700 text-3xl font-semibold">Reviews</h2>
        </div>
      </div>

      {/* Summary + Bar Rating */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Left Summary */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-gray-900">
              Customer Reviews
            </p>
            <p className="text-4xl font-bold text-black">4.7</p>
            <div className="flex gap-1 text-orange-400 text-xl">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <IoIosStar key={i} />
                ))}
            </div>
            <p className="text-xs text-zinc-500 font-medium">(578 Reviews)</p>
          </div>

          {/* Rating Bars */}
          <div className="flex flex-col gap-2 w-full max-w-[280px]">
            {["5", "4", "3", "2", "1"].map((num, index) => (
              <div key={index} className="flex items-center gap-3">
                <p
                  className={`w-10 text-sm font-medium ${
                    num > 3 ? "text-black" : "text-zinc-500"
                  }`}
                >
                  {num} <span className="text-yellow-400">⭐</span>
                </p>
                <div className="flex-1 h-1.5 rounded-lg bg-slate-100 relative overflow-hidden">
                  <div
                    className={`absolute h-full ${
                      num === "5"
                        ? "w-[90%] bg-orange-300"
                        : num === "4"
                        ? "w-[40%] bg-orange-300"
                        : num === "3"
                        ? "w-[10%] bg-orange-300"
                        : "w-[3%] bg-slate-200"
                    } rounded-lg`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* List of Reviews */}
      <div className="flex flex-col gap-7">
        {[review1, review2].map((review, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-3 px-4 py-4 border rounded-lg shadow-sm bg-white"
          >
            <p className="text-xs font-semibold text-zinc-500">{review.date}</p>
            <div className="flex gap-1 text-orange-400 text-xl">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <IoIosStar
                    key={i}
                    className={`${i < review.rating ? "" : "text-gray-300"}`}
                  />
                ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-indigo-500 opacity-20 rounded-full" />
              <p className="text-indigo-500 text-sm font-semibold">
                {review.initials}
              </p>
              <p className="text-gray-900 text-sm font-medium">{review.name}</p>
            </div>
            <p className="text-zinc-500 text-sm font-medium">
              {review.position}
            </p>
            <p className="text-gray-900 text-sm">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const review1 = {
  date: "Jan 20, 2024",
  rating: 5,
  initials: "AK",
  name: "Alex K.",
  position: "Senior Analyst",
  text: `Working at Sam.AI has been an incredible journey so far. The technology we're building is truly cutting-edge.`,
};

const review2 = {
  date: "Nov 13, 2023",
  rating: 4,
  initials: "ER",
  name: "Emily R.",
  position: "Front-End Engineer",
  text: `Sam.AI is not just a workplace; it's a community of passionate individuals driven by a common goal.`,
};

export { Review };
