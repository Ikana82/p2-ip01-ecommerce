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
import { db } from "../../firebase/firebase";

const initialState = {
  items: [],
  item: {},
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setProduct: (state, action) => {
      state.item = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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
    const querySnap = await getDocs(collection(db, "products"));
    const result = querySnap.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    dispatch(setProducts(result));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchProductById = (idProduct) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const queryDoc = doc(db, "products", idProduct);
    const docSnap = await getDoc(queryDoc);
    dispatch(setProduct(docSnap.data()));
  } catch (error) {
    dispatch(setError(error.message));
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
      price: product.price,
      imgUrl: product.imgUrl,
      category: product.category,
      gender: product.gender,
      style: product.style,
      size: product.size,
      stock: product.stock,
      description: product.description,
      color: product.color,
      createdAt: product.createdAt,
      rating: product.rating,
      discountPrice: product.discountPrice,
    });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch(setError(error.message));
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
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const editProduct = (idProduct, product) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    await updateDoc(doc(db, "products", idProduct), {
      name: product.name,
      price: product.price,
      imgUrl: product.imgUrl,
      category: product.category,
      gender: product.gender,
      style: product.style,
      size: product.size,
      stock: product.stock,
      description: product.description,
      color: product.color,
      createdAt: product.createdAt,
      rating: product.rating,
      discountPrice: product.discountPrice,
    });
    dispatch(fetchProducts());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default productSlice.reducer;
