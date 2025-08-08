import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/features/productSlice";
import { fetchCategories } from "../redux/features/categorySlice";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Timestamp } from "firebase/firestore";
import { MdArrowDropDown } from "react-icons/md";

function AddProductPage() {
  const [namaProduct, setNamaProduct] = useState("");
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState([""]);
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [style, setStyle] = useState("");
  const [size, setSize] = useState([""]);
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState([""]);
  const [rating, setRating] = useState("");
  const [newArrival, setNewArrival] = useState(true); // Default true
  const [discountPrice, setDiscountPrice] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, isLoading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fungsi untuk menangani perubahan pada input imgUrl
  const handleImgUrlChange = (index, value) => {
    const newImgUrls = [...imgUrl];
    newImgUrls[index] = value;
    setImgUrl(newImgUrls);
  };

  // Fungsi untuk menambah input imgUrl baru
  const addMoreImgUrl = () => {
    setImgUrl([...imgUrl, ""]);
  };

  // Fungsi untuk menghapus input imgUrl
  const deleteImgUrl = (index) => {
    const newImgUrls = imgUrl.filter((_, i) => i !== index);
    setImgUrl(newImgUrls);
  };

  // Fungsi untuk menangani perubahan pada input color
  const handleColorChange = (index, value) => {
    const newColors = [...color];
    newColors[index] = value;
    setColor(newColors);
  };

  // Fungsi untuk menambah input color baru
  const addMoreColor = () => {
    setColor([...color, ""]);
  };

  // Fungsi untuk menghapus input color
  const deleteColor = (index) => {
    const newColors = color.filter((_, i) => i !== index);
    setColor(newColors);
  };

  // Fungsi untuk menangani perubahan pada input size
  const handleSizeChange = (index, value) => {
    const newSizes = [...size];
    newSizes[index] = value;
    setSize(newSizes);
  };

  // Fungsi untuk menambah input size baru
  const addMoreSize = () => {
    setSize([...size, ""]);
  };

  // Fungsi untuk menghapus input size
  const deleteSize = (index) => {
    const newSizes = size.filter((_, i) => i !== index);
    setSize(newSizes);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!category) {
      Swal.fire("Error", "Please select a category", "error");
      return;
    }

    const product = {
      name: namaProduct,
      price: Number(price),
      imgUrl: imgUrl.filter((url) => url.trim() !== ""),
      category,
      gender,
      style,
      size: size.filter((s) => s.trim() !== ""),
      stock: Number(stock),
      description,
      color: color.filter((c) => c.trim() !== ""),
      createdAt: Timestamp.now(),
      rating: Number(rating),
      newArrival: newArrival,
      discountPrice: discountPrice ? Number(discountPrice) : null,
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
                value={namaProduct}
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
                value={price}
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
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
                  <MdArrowDropDown size={24} />
                </div>
              </div>
            </div>

            {/* Input untuk imgUrl yang bisa ditambah/dihapus */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm font-bold text-zinc-800">
                Image URLs
              </label>
              {imgUrl.map((url, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleImgUrlChange(index, e.target.value)}
                    placeholder={`Image URL ${index + 1}`}
                    className="flex-1 h-10 px-4 rounded-lg outline outline-gray-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => deleteImgUrl(index)}
                    className={`text-sm ${
                      imgUrl.length === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-500 hover:underline"
                    }`}
                    disabled={imgUrl.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addMoreImgUrl}
                className="text-sm text-gray-600 hover:underline w-fit"
              >
                + Add More URL
              </button>
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

            {/* Input untuk Size yang bisa ditambah/dihapus */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm font-bold text-zinc-800">Sizes</label>
              {size.map((s, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={s}
                    onChange={(e) => handleSizeChange(index, e.target.value)}
                    placeholder={`Size ${index + 1}`}
                    className="flex-1 h-10 px-4 rounded-lg outline outline-gray-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => deleteSize(index)}
                    className={`text-sm ${
                      size.length === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-500 hover:underline"
                    }`}
                    disabled={size.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addMoreSize}
                className="text-sm text-gray-600 hover:underline w-fit"
              >
                + Add More Size
              </button>
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
                value={stock}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Input untuk Color yang bisa ditambah/dihapus */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm font-bold text-zinc-800">Colors</label>
              {color.map((c, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={c}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    placeholder={`Color ${index + 1}`}
                    className="flex-1 h-10 px-4 rounded-lg outline outline-gray-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => deleteColor(index)}
                    className={`text-sm ${
                      color.length === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-500 hover:underline"
                    }`}
                    disabled={color.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addMoreColor}
                className="text-sm text-gray-600 hover:underline w-fit"
              >
                + Add More Color
              </button>
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
                value={rating}
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
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="new-arrival"
                name="new-arrival"
                checked={newArrival}
                onChange={(e) => setNewArrival(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="new-arrival"
                className="ml-2 block text-sm text-gray-900"
              >
                New Arrival
              </label>
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
