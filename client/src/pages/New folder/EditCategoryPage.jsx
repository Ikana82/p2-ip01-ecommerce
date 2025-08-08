import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { editCategory } from "../redux/features/category/categorySlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditCategoryPage() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCategoryData() {
      try {
        const docRef = doc(db, "categories", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          setCategory(fetchedData.category || "");
          if (
            Array.isArray(fetchedData.subCategory) &&
            fetchedData.subCategory.length > 0
          ) {
            setSubCategory(fetchedData.subCategory);
          } else {
            setSubCategory([""]);
          }
        } else {
          toast.error("Category not found");
          navigate("/list-category");
        }
      } catch (error) {
        toast.error("Error loading category");
        console.error("Error loading category:", error);
      }
    }

    if (id) {
      getCategoryData();
    }
  }, [id, navigate]);

  const handleSubCategoryChange = (index, value) => {
    const newSubCategories = [...subCategory];
    newSubCategories[index] = value;
    setSubCategory(newSubCategories);
  };

  const addMoreSubCategory = () => {
    setSubCategory([...subCategory, ""]);
  };

  const deleteSubCategory = (indexToDelete) => {
    if (subCategory.length === 1) {
      toast.warn("Minimal harus ada satu sub-kategori.");
      return;
    }
    setSubCategory(subCategory.filter((_, index) => index !== indexToDelete));
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    if (!category.trim()) {
      toast.error("Category name is required.");
      return;
    }

    setIsLoading(true);
    try {
      const cleanedSubCategories = subCategory
        .map((sub) => sub.trim())
        .filter((sub) => sub !== "");

      const success = await dispatch(
        editCategory({
          id,
          category,
          subCategory: cleanedSubCategories,
        })
      );

      if (success) {
        toast.success("Category updated successfully!");
        setTimeout(() => navigate("/list-category"), 2000);
      } else {
        toast.error("Failed to update category.");
      }
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Failed to update category.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <main className="p-8 max-w-3xl mx-auto mt-4">
        <form
          onSubmit={handleEditCategory}
          className="p-6 bg-white rounded-3xl shadow-md outline outline-red-200 flex flex-col gap-4"
        >
          <h2 className="text-zinc-800 text-xl font-semibold">Edit Category</h2>
          <p className="text-sm text-gray-700">
            Update category and its sub-categories.
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
            {isLoading ? "Updating Category..." : "Update"}
          </button>
        </form>
      </main>
    </>
  );
}
