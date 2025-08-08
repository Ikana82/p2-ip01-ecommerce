import { useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../redux/features/productSlice";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.product);

  const handleNavigateAddProduct = () => {
    navigate("/add-grocery");
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-lg font-semibold text-gray-800">Brand</div>
            <div>
              <button className="text-gray-800 mx-2">Home</button>
              <button
                onClick={handleNavigateAddProduct}
                className="text-gray-800 mx-2"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {loading && <h1>Loading...</h1>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <img
                src={item.imgUrl || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-full h-32 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-700 mb-2">
                Rp{Number(item.price).toLocaleString("id-ID")}
              </p>
              <p className="text-gray-600 mb-4">{item.category}</p>
              <div className="flex justify-between mt-auto">
                <button
                  onClick={() => handleDeleteProduct(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default HomePage;
