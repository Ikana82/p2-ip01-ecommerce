import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import EditproductPage from "./pages/EditProductPage";
import AddproductPage from "./pages/AddProductPage";
import Navbar from "./components/Navbar";
import AddCategoryPage from "./pages/AddCategoryPage";
import ListCategory from "./pages/ListCategory";
import EditCategoryPage from "./pages/EditCategoryPage";
import PublicLayout from "./layouts/PublicLayout";
import HomePagePublic from "./pages/public/HomePublicPage";
import ContactPage from "./pages/ContactPage";
import { useContext, useEffect } from "react";
import HomePublicPage from "./pages/public/HomePublicPage";
import AboutPublicPage from "./pages/public/AboutPublicPage";
import MenPublicPage from "./pages/public/MenPublicPage";
import WomanPublicPage from "./pages/public/WomanPublicPage";

function AdminProtactedPage({ children }) {
  const { role } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (role !== "admin") {
      navigate("/public", {
        // state: location,
        replace: true,
      });
    } else {
      navigate("/");
    }
    // if (role === "admin") {
    //   navigate("/", {
    //     // state: location,
    //     replace: true,
    //   });
    // }
  }, [role]);

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminProtactedPage>
        <MainLayout />
      </AdminProtactedPage>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "add",
        element: <AddproductPage />,
      },
      {
        path: "edit/:id",
        element: <EditproductPage />,
      },
      {
        path: "category",
        element: <AddCategoryPage />,
      },
      {
        path: "list-category",
        element: <ListCategory />,
      },
      {
        path: "edit-category/:id",
        element: <EditCategoryPage />,
      },
    ],
  },
  {
    path: "/public",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePublicPage />,
      },
      {
        path: "about",
        element: <AboutPublicPage />,
      },
      {
        path: "shop",
        element: <HomePublicPage />,
      },
      {
        path: "men",
        element: <MenPublicPage />,
      },
      {
        path: "woman",
        element: <WomanPublicPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AdminLayout />,
    children: [
      {
        path: "login", // Hindari memberikan / pada children yang berada di page yang sama
        element: <LoginPage />,
      },
      {
        path: "register", // Hindari memberikan / pada children
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
