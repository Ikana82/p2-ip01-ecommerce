import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { db } from "../configs/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getDoc, doc } from "firebase/firestore";
import {
  editProductById,
  fetchProductById,
} from "../redux/features/product/productSlice";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { BsCardImage } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { MdArrowDropDown } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

export default function EditproductPage() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [stock, setStock] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [sku, setSku] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const product = useSelector((state) => state.product.productById);

  async function editProduct(e) {
    e.preventDefault();
    if (!name) return toast.error("Product name is required.");
    if (!imageUrl) return toast.error("Product image is required.");
    if (!price || price <= 0) return toast.error("Valid price is required.");
    if (!description) return toast.error("Description is required.");
    if (!category) return toast.error("Category is required.");
    if (!stock || stock < 0) return toast.error("Valid stock is required.");
    if (!sku) return toast.error("SKU is required.");
    if (!size) return toast.error("Size is required.");
    if (!color) return toast.error("Color is required.");

    setIsLoadingCreate(true);

    try {
      await dispatch(
        editProductById({
          id,
          name,
          imageUrl,
          price: Number(price),
          description,
          category,
          stock: Number(stock),
          size,
          color,
          sku,
        })
      );
      toast.success("Product updated successfully!", id);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error("Failed to edit product:", error);
      toast.error("Failed to update product.");
    } finally {
      setIsLoadingCreate(false);
    }
  }

  useEffect(() => {
    async function getProductById(idProduct) {
      try {
        const docRef = doc(db, "products", idProduct);
        const docSnap = await getDoc(docRef);

        const product = {
          name: docSnap.data().name,
          imageUrl: docSnap.data().imageUrl,
          price: docSnap.data().price,
          description: docSnap.data().description,
          category: docSnap.data().category,
          stock: docSnap.data().stock,
          size: docSnap.data().size,
          color: docSnap.data().color,
          sku: docSnap.data().sku,
        };
        setName(product.name);
        setImageUrl(product.imageUrl);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setStock(product.stock);
        setSize(product.size);
        setColor(product.color);
        setSku(product.sku);
      } catch (error) {
        console.log(error);
      }
    }
    getProductById(id);
  }, []);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImageUrl(product.imageUrl);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setSize(product.size);
      setColor(product.color);
      setSku(product.sku);
    }
  }, [product]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoryList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <main className="p-8 mt-2 max-w-7xl mx-auto">
        <form
          onSubmit={editProduct}
          className="flex gap-6 justify-start items-start"
        >
          <div className="w-[600px] p-6 bg-white rounded-3xl outline-red-200 flex flex-col gap-4 shadow-md">
            <div>
              <h2 className="text-zinc-800 text-xl font-semibold">
                Edit Product
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
                <div className="relative w-full max-w-xs">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="appearance-none w-full h-12 px-4 pr-10 rounded-xl border border-red-300 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                  </select>

                  <MdArrowDropDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 pointer-events-none" />
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
                  placeholder="22000"
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
                <div className="flex flex-col py-3 items-center gap-1 text-red-300 text-sm italic">
                  <BsCardImage size={24} />
                  Upload Image
                </div>
              )}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gray-500 bg-opacity-10 flex items-center justify-center transition duration-200">
                <FileUploaderRegular
                  pubkey="33563ee22dfa473493de"
                  onFileUploadSuccess={(result) => {
                    console.log("Successfully uploaded file");
                    setImageUrl(result.cdnUrl);
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-red-600 font-medium">
                Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled
                className="w-full h-10 px-4 bg-red-100 rounded-lg border border-red-300 text-sm placeholder:text-red-400 placeholder:italic outline-none"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className=" border border-red-500  mt-4 w-full hover:bg-red-700 hover:text-white text-red-500 font-semibold py-3 rounded-xl transition duration-200n"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
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
                    Updating Product...
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
