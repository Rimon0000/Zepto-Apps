import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import BookDetails from "../pages/Books/BookDetails/BookDetails";
import WishList from "../pages/WishList/WishList";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/wishlist",
          element: <WishList/>
      },
        {
          path: "/books/:id",
          element: <BookDetails/>,
          loader: ({ params }) => fetch(`https://gutendex.com/books/${params.id}`),
      },
      ]
    },
  ]);

  export default router;