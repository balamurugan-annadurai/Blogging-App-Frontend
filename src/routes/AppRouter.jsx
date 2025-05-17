import { createBrowserRouter } from "react-router-dom";
import { Home } from '../pages/home';
import { Login, Signup } from '../pages/auth';
import { Blogs, BlogDetails, CreateBlog, MyBlogs } from '../pages/blog';
import { NotFound } from '../pages/notFound';
import PrivateRoute from "./PrivateRoute";
import AppLayout from "../layout/AppLayout";

const router = createBrowserRouter([
    {
        element: <AppLayout />,  // Wrap ALL routes with AppLayout
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                element: <PrivateRoute />,  // Protect the below routes
                children: [
                    {
                        path: "/blogs",
                        element: <Blogs />,
                    },
                    {
                        path: "/blogs/:id",
                        element: <BlogDetails />,
                    },
                    {
                        path: "/create",
                        element: <CreateBlog />,
                    },
                    {
                        path: "/myblogs",
                        element: <MyBlogs />,
                    },
                ],
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default router;
