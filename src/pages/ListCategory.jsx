import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editCategory,
  fetchCategories,
  deleteCategory as deleteCategoryRedux,
} from "../redux/features/category/categorySlice";
import { HiTrash } from "react-icons/hi2";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function ListCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, isLoading, error } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const deleteCategory = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will delete this category permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteCategoryRedux(id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Category has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to delete category.",
        });
      }
    }
  };

  return (
    <main className="p-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-neutral-800 mb-3">
          Category List
        </h1>

        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex w-full md:w-[500px] items-center px-4 py-2 rounded-xl border border-neutral-300 bg-white shadow-sm">
            <input
              type="text"
              value=""
              placeholder="Search category name"
              className="flex-grow text-sm text-gray-700 placeholder:text-neutral-400"
            />
            <FaSearch className="text-neutral-500 text-sm" />
          </div>

          <button
            onClick={() => navigate("/category")}
            className="text-sm text-white bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg"
          >
            + Add Category
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F8E7E7]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Sub-categories
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Loading categories...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-sm text-red-600"
                >
                  Failed to fetch categories: {error}
                </td>
              </tr>
            )}
            {!isLoading && Array.isArray(categories) && categories.length > 0
              ? categories.map((cat, index) => (
                  <tr key={cat.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cat.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Array.isArray(cat.subCategory)
                        ? cat.subCategory.join(", ")
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => navigate(`/edit-category/${cat.id}`)}
                          className="text-gray-700 hover:text-red-500"
                        >
                          <RiEdit2Fill size={18} />
                        </button>
                        <button
                          onClick={() => deleteCategory(cat.id)}
                          className="text-gray-700 hover:text-red-500"
                        >
                          <HiTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : !isLoading &&
                !error && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-12 text-center text-sm text-gray-400"
                    >
                      <div className="flex flex-col items-center justify-center gap-2 text-neutral-300">
                        <FaTags size={50} className="text-neutral-200" />
                        <p className="text-base font-medium text-neutral-400 mt-2">
                          No categories have been added yet.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
