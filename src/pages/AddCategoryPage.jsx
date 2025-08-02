import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addCategory } from "../redux/features/category/categorySlice.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCategoryPage() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubCategoryChange = (index, value) => {
    const updated = [...subCategory];
    updated[index] = value;
    setSubCategory(updated);
  };

  const addMoreSubCategory = () => {
    setSubCategory([...subCategory, ""]);
  };

  const deleteSubCategory = (index) => {
    if (subCategory.length === 1) return;
    setSubCategory(subCategory.filter((_, i) => i !== index));
  };

  const submitCategory = async (e) => {
    e.preventDefault();

    if (!category.trim()) return toast.error("Category name is required.");
    if (subCategory.some((sub) => !sub.trim()))
      return toast.error("Sub-category cannot be empty.");

    setIsLoading(true);
    try {
      await dispatch(addCategory({ category, subCategory }));
      toast.success("Category added successfully!");
      setTimeout(() => navigate("/list-category"), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <main className="p-8 max-w-3xl mx-auto mt-4">
        <form
          onSubmit={submitCategory}
          className="p-6 bg-white rounded-3xl shadow-md outline outline-red-200 flex flex-col gap-4"
        >
          <h2 className="text-zinc-800 text-xl font-semibold">
            Add New Category
          </h2>
          <p className="text-sm text-gray-700">
            Create a new category and its sub-categories.
          </p>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-zinc-800">
              Category Name
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Fashion"
              className="h-12 p-4 rounded-xl outline outline-red-300 text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-zinc-800">
              Sub-categories
            </label>
            {subCategory.map((sub, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={sub}
                  onChange={(e) =>
                    handleSubCategoryChange(index, e.target.value)
                  }
                  placeholder={`Sub-category ${index + 1}`}
                  className="flex-1 h-10 px-4 rounded-lg outline outline-red-300 text-sm"
                />
                <button
                  type="button"
                  onClick={() => deleteSubCategory(index)}
                  className={`text-sm ${
                    subCategory.length === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500 hover:underline"
                  }`}
                  disabled={subCategory.length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addMoreSubCategory}
              className="text-sm text-red-600 hover:underline w-fit"
            >
              + Add More
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 w-full text-white font-semibold py-3 rounded-xl transition duration-200 ${
              isLoading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-[#ff0000] hover:bg-red-700"
            }`}
          >
            {isLoading ? "Adding Category..." : "Submit"}
          </button>
        </form>
      </main>
    </>
  );
}
