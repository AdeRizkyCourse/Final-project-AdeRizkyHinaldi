import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import { Dashboard, ClientCreate, ClientPage, ClientDetail, ClientUpdate, InvoiceCreate, InvoicePage, InvoiceDetail, InvoiceUpdate, UserPage, UserCreate, UserDetail, UserUpdate } from "../pages";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/clients",
                element: <ClientPage />,
            },
            {
                path: "/clients/create",
                element: <ClientCreate />,
            },
            {
                path: "/clients/detail/:id",
                element: <ClientDetail />,
            },
            {
                path: "/clients/update/:id",
                element: <ClientUpdate />,
            },
            {
                path: "/invoices/create",
                element: <InvoiceCreate />,
            },
            {
                path: "/invoices",
                element: <InvoicePage />,
            },
            {
                path: "/invoices/detail/:id",
                element: <InvoiceDetail />,
            },
             {
                path: "/invoices/update/:id",
                element: <InvoiceUpdate />,
            },
            {
                path: "/users",
                element: <UserPage />,
            },
            {
                path: "/users/create",
                element: <UserCreate />,
            },
            {
                path: "/users/detail/:id",
                element: <UserDetail />,
            },
             {
                path: "/users/update/:id",
                element: <UserUpdate />,
            },

        ],
    },
]);

export default routes;