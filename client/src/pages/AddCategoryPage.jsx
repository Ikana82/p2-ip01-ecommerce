import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/features/productSlice";
import { fetchCategories } from "../redux/features/categorySlice";
import Swal from "sweetalert2";

function AddCategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  const [gender, setGender] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      category: categoryName.split(",").map((item) => item.trim()),
      gender: gender.split(",").map((item) => item.trim()),
      style: style.split(",").map((item) => item.trim()),
      color: color.split(",").map((item) => item.trim()),
      size: size.split(",").map((item) => item.trim()),
    };

    try {
      await dispatch(addCategory(newCategory));
      Swal.fire("Berhasil", "Kategori berhasil ditambahkan!", "success");
      setCategoryName("");
      setGender("");
      setStyle("");
      setColor("");
      setSize("");
    } catch (error) {
      Swal.fire(
        "Error",
        "Gagal menambahkan kategori. Silakan coba lagi.",
        "error"
      );
    }
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-lg font-semibold text-gray-800">Brand</div>
            <div>
              <button
                onClick={handleNavigateHome}
                className="text-gray-800 mx-2"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/add-new")}
                className="text-gray-800 mx-2"
              >
                Product
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8 text-black">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Tambah Kategori Baru</h2>
          <form onSubmit={handleSubmit} className="text-gray-500">
            {/* Input untuk Nama Kategori */}
            <div className="mb-4">
              <label
                htmlFor="category-name"
                className="block text-gray-700 mb-2"
              >
                Nama Kategori
              </label>
              <input
                type="text"
                id="category-name"
                name="category-name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="cth: Pakaian, Elektronik"
                required
              />
            </div>

            {/* Input untuk Gender */}
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700 mb-2">
                Gender
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="cth: Pria, Wanita, Unisex"
              />
            </div>

            {/* Input untuk Style */}
            <div className="mb-4">
              <label htmlFor="style" className="block text-gray-700 mb-2">
                Style
              </label>
              <input
                type="text"
                id="style"
                name="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="cth: Casual, Formal, Sporty"
              />
            </div>

            {/* Input untuk Color */}
            <div className="mb-4">
              <label htmlFor="color" className="block text-gray-700 mb-2">
                Warna
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="cth: Merah, Hitam, Putih"
              />
            </div>

            {/* Input untuk Size */}
            <div className="mb-4">
              <label htmlFor="size" className="block text-gray-700 mb-2">
                Ukuran
              </label>
              <input
                type="text"
                id="size"
                name="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="cth: S, M, L, XL"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Tambah Kategori
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCategoryPage;
