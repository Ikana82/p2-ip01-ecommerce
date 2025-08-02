import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addProduct } from "../redux/features/product/productSlice.js";
import UploadWidget from "../components/UploadWidget.jsx";
import { RiImageAddLine } from "react-icons/ri";
import { PiUploadSimpleFill } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdArrowDropDown } from "react-icons/md";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase";

export default function AddproductPage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [sku, setSku] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function submitProduct(e) {
    e.preventDefault();

    if (!name) return toast.error("Product name is required.");
    if (!imageUrl) return toast.error("Product image is required.");
    if (!price || price <= 0) return toast.error("Valid price is required.");
    if (!description) return toast.error("Description is required.");
    if (!category) return toast.error("Category is required.");
    if (!stock || stock < 0) return toast.error("Stock quantity is required.");
    if (!sku) return toast.error("SKU is required.");
    if (!size) return toast.error("Size is required.");
    if (!color) return toast.error("Color is required.");

    setIsLoadingCreate(true);

    try {
      const product = {
        name,
        imageUrl,
        price,
        description,
        category,
        stock,
        size,
        color,
        sku,
      };
      dispatch(addProduct(product));
      toast.success("Product created successfully!");
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create product.");
    } finally {
      setIsLoadingCreate(false);
    }
  }

  useEffect(() => {
    async function fetchCategory() {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const fetchedCategories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    }

    fetchCategory();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <main className="p-8 mt-2 max-w-7xl mx-auto">
        <form
          onSubmit={submitProduct}
          className="flex gap-6 justify-start items-start"
        >
          <div className="w-[600px] p-6 bg-white rounded-3xl outline-red-200 flex flex-col gap-4 shadow-md">
            <div>
              <h2 className="text-zinc-8000 text-xl font-semibold">
                Product Information
              </h2>
              <p className="text-gray-700 text-sm">
                Update product details below.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-zinc-800">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="h-12 p-4 rounded-xl outline outline-red-300 text-sm"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-sm font-bold text-zinc-800">Size</label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="e.g, S, M, L, XL"
                  className="h-12 p-4 rounded-xl outline outline-red-300 text-sm"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-sm font-bold text-zinc-800">Color</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="Red White"
                  className="h-12 p-4 rounded-xl outline outline-red-300 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-sm font-bold text-zinc-800">
                  Category
                </label>
                <div className="relative w-full">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-12 px-4 pr-10 w-full rounded-xl outline outline-red-300 text-sm bg-white appearance-none"
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
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-sm font-bold text-zinc-800">
                  Price (Rp)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="$22.00"
                  className="h-12 p-4 rounded-xl outline outline-red-300 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-sm font-bold text-zinc-800">
                  Quantity
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter stock quantity"
                  className="h-12 p-4 rounded-xl outline outline-red-300 text-sm"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-sm font-bold text-zinc-800">SKU</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="Enter sku product"
                  className="h-12 p-4 rounded-xl outline outline-red-300 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-zinc-800">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short product description"
                className="max-w-md min-w-[550px] h-20 p-4 rounded-xl outline outline-red-300 text-sm placeholder:text-left placeholder:align-top resize-none"
              />
            </div>
          </div>

          <div className="flex-1 p-6 bg-white rounded-3xl outline-red-200 flex flex-col gap-4 shadow-md">
            <div className="flex flex-col gap-2">
              <h2 className="text-zinc-800 text-xl font-semibold">
                Product Image
              </h2>
              <p className="text-xs">
                <span className="text-red-600 font-bold">Note:</span>
                <span className="text-neutral-800">
                  {" "}
                  Format SVG, PNG, JPG (max 4MB)
                </span>
              </p>
            </div>

            <div className="flex-1 h-50 bg-neutral-50 rounded-lg border border-dashed border-red-300 flex items-center justify-center relative group cursor-pointer">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="object-contain max-h-full"
                />
              ) : (
                <div className="flex flex-col py-5 items-center gap-1 text-red-300 text-sm italic">
                  <RiImageAddLine size={24} />
                  Upload Image
                </div>
              )}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gray-500 bg-opacity-10 flex items-center justify-center transition duration-200">
                <UploadWidget setImageUrl={setImageUrl} />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-zinc-800 font-medium">
                Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste image URL manually"
                className="w-full h-10 px-4 bg-red-100 rounded-lg border border-red-300 text-sm placeholder:text-red-400 placeholder:italic outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoadingCreate}
              className={`mt-4 w-full text-white font-semibold py-3 rounded-xl transition duration-200 ${
                isLoadingCreate
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-[#ff0000] hover:bg-red-700"
              }`}
            >
              {isLoadingCreate ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner text-white"></span>
                  Adding Product...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
