import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { addToCart } from "./cartSlice";

export const addToCartWithStock = (product, quantity = 1) => {
  return async (dispatch) => {
    try {
      const productRef = doc(db, "products", product.id);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        throw new Error("Produk tidak ditemukan");
      }

      const currentStock = productSnap.data().stock;

      if (currentStock < quantity) {
        alert("Stok tidak mencukupi");
        return;
      }

      await updateDoc(productRef, {
        stock: currentStock - quantity,
      });

      const finalPrice =
        product.discountPrice && product.discountPrice > 0
          ? product.price - (product.price * product.discountPrice) / 100
          : product.price;

      dispatch(
        addToCart({
          ...product,
          price: finalPrice,
          quantity,
        })
      );
    } catch (error) {
      console.error("Error menambahkan produk:", error);
    }
  };
};
