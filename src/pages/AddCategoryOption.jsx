import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { addCategory } from "../redux/features/categorySlice";

function AddCategoryOption() {
  const [categoryName, setCategoryName] = useState([""]);
  const [gender, setGender] = useState([""]);
  const [style, setStyle] = useState([""]);
  const [color, setColor] = useState([""]);
  const [size, setSize] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Helper untuk mengubah state array pada index tertentu
  const handleInputChange = (setState, index, value) => {
    setState((prevState) => {
      const updatedArray = [...prevState];
      updatedArray[index] = value;
      return updatedArray;
    });
  };

  // Helper untuk menambahkan input baru
  const addMoreInput = (setState) => {
    setState((prevState) => [...prevState, ""]);
  };

  // Helper untuk menghapus input
  const deleteInput = (setState, index) => {
    setState((prevState) => {
      if (prevState.length === 1) {
        return prevState;
      }
      return prevState.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Filter array untuk menghapus nilai yang kosong atau hanya spasi
    const filteredCategoryName = categoryName.filter(
      (item) => item.trim() !== ""
    );
    const filteredGender = gender.filter((item) => item.trim() !== "");
    const filteredStyle = style.filter((item) => item.trim() !== "");
    const filteredColor = color.filter((item) => item.trim() !== "");
    const filteredSize = size.filter((item) => item.trim() !== "");

    // Validasi: pastikan nama kategori tidak kosong
    if (filteredCategoryName.length === 0) {
      Swal.fire("Peringatan", "Nama kategori wajib diisi.", "warning");
      setIsLoading(false);
      return;
    }

    const newCategory = {
      category: filteredCategoryName,
      gender: filteredGender,
      style: filteredStyle,
      color: filteredColor,
      size: filteredSize,
    };

    try {
      await dispatch(addCategory(newCategory));
      Swal.fire("Berhasil", "Kategori berhasil ditambahkan!", "success");

      // Reset form
      setCategoryName([""]);
      setGender([""]);
      setStyle([""]);
      setColor([""]);
      setSize([""]);
    } catch (error) {
      console.error("Gagal menambahkan kategori:", error);
      Swal.fire(
        "Error",
        "Gagal menambahkan kategori. Silakan coba lagi.",
        "error"
      );
    } finally {
      setIsLoading(false);
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
            {/* Input untuk Nama Kategori (sebagai contoh, kita buat satu input saja untuk kategori utama) */}
            <InputGroup
              label="Nama Kategori"
              items={categoryName}
              setState={setCategoryName}
              // CategoryName hanya butuh satu input
              isRemovable={false}
              placeholder="cth: Pakaian"
            />
            {/* Input untuk Gender */}
            <InputGroup
              label="Gender"
              items={gender}
              setState={setGender}
              placeholder="cth: Pria"
            />
            {/* Input untuk Style */}
            <InputGroup
              label="Style"
              items={style}
              setState={setStyle}
              placeholder="cth: Casual"
            />
            {/* Input untuk Color */}
            <InputGroup
              label="Warna"
              items={color}
              setState={setColor}
              placeholder="cth: Merah"
            />
            {/* Input untuk Size */}
            <InputGroup
              label="Ukuran"
              items={size}
              setState={setSize}
              placeholder="cth: S"
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Menambahkan..." : "Tambah Kategori"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// Komponen helper untuk Input Group yang bisa ditambah/dihapus
const InputGroup = ({
  label,
  items,
  setState,
  placeholder,
  isRemovable = true,
}) => {
  const handleInputChange = (index, value) => {
    setState((prevState) => {
      const updatedArray = [...prevState];
      updatedArray[index] = value;
      return updatedArray;
    });
  };

  const addMoreInput = () => {
    setState((prevState) => [...prevState, ""]);
  };

  const deleteInput = (index) => {
    setState((prevState) => {
      if (prevState.length === 1 && isRemovable) {
        return prevState;
      }
      return prevState.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={item}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="flex-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
              placeholder={`${placeholder} ${index > 0 ? index + 1 : ""}`}
            />
            {isRemovable && items.length > 1 && (
              <button
                type="button"
                onClick={() => deleteInput(index)}
                className="text-sm text-red-500 hover:underline"
              >
                Hapus
              </button>
            )}
          </div>
        ))}
        {isRemovable && (
          <button
            type="button"
            onClick={addMoreInput}
            className="text-sm text-blue-500 hover:underline w-fit"
          >
            + Tambah Lagi
          </button>
        )}
      </div>
    </div>
  );
};

export default AddCategoryOption;
