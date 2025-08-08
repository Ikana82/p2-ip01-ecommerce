import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../configs/firebase";

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setProduct, setLoading, setError } =
  productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const result = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(), // =>  object { name, imageUrl, price, description, category, stock }
      };
    });
    dispatch(setProducts(result));
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchProductById = (idProduct) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const docRef = doc(db, "products", idProduct);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const product = {
        id: docSnap.id,
        ...docSnap.data(),
      };
      dispatch(setProduct(product));
    } else {
      dispatch(setError("Product not found"));
    }
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addProduct = (product) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    await addDoc(collection(db, "products"), {
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      size: product.size,
      color: product.color,
      sku: product.sku,
    });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteProduct = (idProduct) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    await deleteDoc(doc(db, "products", idProduct));
    dispatch(fetchProducts());
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const editProductById = (product) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const docRef = doc(db, "products", product.id);
    await updateDoc(docRef, {
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      size: product.size,
      color: product.color,
      sku: product.sku,
    });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch(setError(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export default productSlice.reducer;
