import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiTrash } from "react-icons/hi2";
import { RiEdit2Fill } from "react-icons/ri";
import { FaBox } from "react-icons/fa";
import Swal from "sweetalert2";

import {
  increment,
  decrement,
  incrementByAmount,
} from "../redux/features/counter/counterSlice";
import {
  fetchProducts,
  deleteProduct as deleteWithRedux,
} from "../redux/features/product/productSlice";

export default function HomePage() {
  const count = useSelector((state) => state.counter.value);
  const { products, isLoading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout Success");
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteWithRedux(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete product.",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products);

  return (
    <>
      <main className="p-6">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-neutral-800">Product List</h1>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-fit p-1 bg-[#F8E7E7] rounded-lg flex justify-between items-center gap-2">
            <div className="px-2 py-1.5 bg-white rounded-md flex justify-center items-center gap-1 cursor-pointer">
              <div className="text-black text-sm">All Products</div>

              <div className="text-red-600 text-sm font-bold">
                ({products.length})
              </div>
            </div>
            <div className="px-3 py-1.5 flex justify-center items-center cursor-pointer">
              <div className="text-neutral-600 text-sms">Available</div>
            </div>
            <div className="px-3 py-1.5 flex justify-center items-center cursor-pointer">
              <div className="text-neutral-600 text-sm">Out of Stock</div>
            </div>
            <div className="px-3 py-1.5 flex justify-center items-center cursor-pointer">
              <div className="text-neutral-600 text-sm">Discontinued</div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-7">
            <div>
              <button
                onClick={() => navigate("/add")}
                className="bg-[#ff0000] text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                + Add Product
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F8E7E7]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Product
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Loading products...
                  </td>
                </tr>
              )}
              {error && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-sm text-red-600"
                  >
                    Failed to fetch products: {error.message}
                  </td>
                </tr>
              )}
              {!isLoading && Array.isArray(products) && products.length > 0
                ? products.map((p, index) => (
                    <tr key={p.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          width="60px"
                          height="60px"
                          src={p.imageUrl}
                          alt={p.name}
                          onError={(e) =>
                            (e.target.src = "https://via.placeholder.com/60")
                          }
                          className="rounded-md object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {p.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Rp{p.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">
                        {p.sku || "No SKU"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {p.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {p.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end items-center gap-2">
                          <Link
                            to={`/edit/${p.id}`}
                            className="text-gray-700 hover:text-red-500"
                          >
                            <RiEdit2Fill size={18} />
                          </Link>
                          <button
                            onClick={() => deleteProduct(p.id)}
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
                        colSpan="8"
                        className="px-6 py-12 text-center text-sm text-gray-400"
                      >
                        <div className="flex flex-col items-center justify-center gap-2 text-neutral-300">
                          <FaBox size={50} className="text-neutral-200" />
                          <p className="text-base font-medium text-neutral-400 mt-2">
                            No products have been added yet.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
