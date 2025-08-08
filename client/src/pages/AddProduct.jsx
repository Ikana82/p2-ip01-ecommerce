// src/components/AddProductPage.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/features/productSlice";
import { fetchCategories } from "../redux/features/categorySlice";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { Timestamp } from "firebase/firestore";
import { MdArrowDropDown } from "react-icons/md";

function AddProductPage() {
  const [namaProduct, setNamaProduct] = useState("");
  const [price, setPrice] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("");
  const [stock, setStock] = useState(null);
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [rating, setRating] = useState(null);
  const [newArrival, setNewArrival] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, isLoading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!category) {
      Swal.fire("Error", "Please select a category", "error");
      return;
    }

    const product = {
      name: namaProduct,
      price: Number(price),
      imgUrl,
      category,
      gender,
      style,
      size,
      stock: Number(stock),
      description,
      color,
      createdAt: createdAt ? Timestamp.fromDate(createdAt) : Timestamp.now(),
      rating: Number(rating),
      newArrival,
      discountPrice: Number(discountPrice),
    };
    dispatch(addProduct(product));
    Swal.fire("Success", "Product added successfully", "success").then(() => {
      navigate(-1);
    });
  };

  const getUniqueOptions = (field) => {
    if (!categories || !Array.isArray(categories)) {
      return [];
    }
    const allOptions = categories.flatMap((cat) => cat[field] || []);
    return [...new Set(allOptions)].filter(Boolean);
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-lg font-semibold text-gray-800">Brand</div>
            <div>
              <button
                onClick={() => navigate("/")}
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
              <button
                onClick={() => navigate("/add-category")}
                className="text-gray-800 mx-2"
              >
                Category
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8 text-black">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
          <form onSubmit={handleAddProduct} className="text-gray-500">
            <div className="mb-4">
              <label
                htmlFor="product-name"
                className="block text-gray-700 mb-2"
              >
                Product Name
              </label>
              <input
                type="text"
                id="product-name"
                name="product-name"
                onChange={(e) => setNamaProduct(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="product-price"
                className="block text-gray-700 mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="product-price"
                name="product-price"
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Select untuk Category */}
            <div className="mb-4 flex-1 flex flex-col gap-1.5">
              <label className="text-sm font-bold text-zinc-800">
                Category
              </label>
              <div className="relative w-full">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-12 px-4 pr-10 w-full rounded-xl outline text-sm bg-white appearance-none"
                >
                  <option value="">-- Select Category --</option>
                  {getUniqueOptions("category").map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
                  <MdArrowDropDown size={24} />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="product-image"
                className="block text-gray-700 mb-2"
              >
                Image URL
              </label>
              <input
                type="url"
                id="product-image"
                name="product-image"
                onChange={(e) => setImgUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Select untuk Gender */}
            <div className="mb-4 flex-1 flex flex-col gap-1.5">
              <label className="text-sm font-bold text-zinc-800">Gender</label>
              <div className="relative w-full">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="h-12 px-4 pr-10 w-full rounded-xl outline text-sm bg-white appearance-none"
                >
                  <option value="">-- Select Gender --</option>
                  {getUniqueOptions("gender").map((gen, index) => (
                    <option key={index} value={gen}>
                      {gen}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
                  <MdArrowDropDown size={24} />
                </div>
              </div>
            </div>

            {/* Select untuk Style */}
            <div className="mb-4 flex-1 flex flex-col gap-1.5">
              <label className="text-sm font-bold text-zinc-800">Style</label>
              <div className="relative w-full">
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="h-12 px-4 pr-10 w-full rounded-xl outline text-sm bg-white appearance-none"
                >
                  <option value="">-- Select Style --</option>
                  {getUniqueOptions("style").map((styleOption, index) => (
                    <option key={index} value={styleOption}>
                      {styleOption}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
                  <MdArrowDropDown size={24} />
                </div>
              </div>
            </div>

            {/* Select untuk Size */}
            <div className="mb-4 flex-1 flex flex-col gap-1.5">
              <label className="text-sm font-bold text-zinc-800">Size</label>
              <div className="relative w-full">
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="h-12 px-4 pr-10 w-full rounded-xl outline text-sm bg-white appearance-none"
                >
                  <option value="">-- Select Size --</option>
                  {getUniqueOptions("size").map((sizeOption, index) => (
                    <option key={index} value={sizeOption}>
                      {sizeOption}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
                  <MdArrowDropDown size={24} />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="product-stock"
                className="block text-gray-700 mb-2"
              >
                Stock
              </label>
              <input
                type="number"
                id="product-stock"
                name="product-stock"
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="product-description"
                className="block text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="product-description"
                name="product-description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Select untuk Color */}
            <div className="mb-4 flex-1 flex flex-col gap-1.5">
              <label className="text-sm font-bold text-zinc-800">Color</label>
              <div className="relative w-full">
                <select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-12 px-4 pr-10 w-full rounded-xl outline text-sm bg-white appearance-none"
                >
                  <option value="">-- Select Color --</option>
                  {getUniqueOptions("color").map((colorOption, index) => (
                    <option key={index} value={colorOption}>
                      {colorOption}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
                  <MdArrowDropDown size={24} />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="product-createdAt"
                className="block text-gray-700 mb-2"
              >
                Created At
              </label>
              <DatePicker
                selected={createdAt}
                onChange={(date) => setCreatedAt(date)}
                dateFormat="yyyy-MM-dd"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholderText="Select a date"
                id="product-createdAt"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="product-rating"
                className="block text-gray-700 mb-2"
              >
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                id="product-rating"
                name="product-rating"
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="product-discount"
                className="block text-gray-700 mb-2"
              >
                Discount Price
              </label>
              <input
                type="number"
                id="product-discount"
                name="product-discount"
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProductPage;
