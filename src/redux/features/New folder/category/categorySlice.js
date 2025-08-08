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
  categories: [],
  category: null,
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setCategory, setLoading, setError } =
  categorySlice.actions;

export const fetchCategories = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setCategories(result));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCategoryById = (categoryId) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const docRef = doc(db, "categories", categoryId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch(
        setCategory({
          id: docSnap.id,
          ...docSnap.data(),
        })
      );
    } else {
      dispatch(setError("Category not found"));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addCategory = (category) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    await addDoc(collection(db, "categories"), {
      category: category.category,
      subCategory: category.subCategory,
    });
    dispatch(fetchCategories());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    await deleteDoc(doc(db, "categories", categoryId));
    dispatch(fetchCategories());
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const editCategory = (category) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  try {
    const docRef = doc(db, "categories", category.id);
    await updateDoc(docRef, {
      category: category.category,
      subCategory: category.subCategory,
    });
    await dispatch(fetchCategories());
    return true;
  } catch (error) {
    dispatch(setError(error.message));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export default categorySlice.reducer;
