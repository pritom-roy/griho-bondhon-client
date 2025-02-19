import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/myhome/Home";
import Register from "../pages/authentication/register/Register";
import Login from "../pages/authentication/login/Login";
import Biodatas from "../pages/biodatas/Biodatas";
import AboutUs from "../pages/aboutus/AboutUs";
import ContactUs from "../pages/contactus/ContactUs";
import DashboardLayout from "../layouts/DashboardLayout";
import EditBiodata from "../pages/dashboard/user/addbiodata/EditBiodata";
import ViewBiodata from "../pages/dashboard/user/viewbiodata/ViewBiodata";
import MyContactRequest from "../pages/dashboard/user/request/MyContactRequest";
import FavouriteBiodata from "../pages/dashboard/user/favourite/FavouriteBiodata";
import AdminDashboard from "../pages/dashboard/admin/admindashboard/AdminDashboard";
import ManageUser from "../pages/dashboard/admin/manage/ManageUser";
import ApprovePremium from "../pages/dashboard/admin/premium/ApprovePremium";
import ApproveContactRequest from "../pages/dashboard/admin/contactrequest/ApproveContactRequest";
import RoleBased from "./RoleBased";
import PrivateRoute from "./PrivateRoute";
import BioDetails from "../pages/details/BioDetails";
import Checkout from "../pages/checkout/Checkout";
import SuccessStoryUser from "../pages/dashboard/user/story/SuccessStoryUser";
import SuccessStoryAdmin from "../pages/dashboard/admin/story/SuccessStoryAdmin";
import Error from "../pages/error/Error";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'biodatas',
                element: <Biodatas />
            },
            {
                path: "biodatas/:id",
                element: <PrivateRoute><BioDetails /></PrivateRoute>
            },
            {
                path: "checkout/:id",
                element: <PrivateRoute><Checkout /></PrivateRoute>
            },
            {
                path: 'aboutus',
                element: <AboutUs />
            },
            {
                path: 'contactus',
                element: <ContactUs />
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: '',
                element: <RoleBased />
            },
            {
                path: 'edit-data',
                element: <EditBiodata />
            },
            {
                path: 'view-data',
                element: <ViewBiodata />
            },
            {
                path: 'contact-request',
                element: <MyContactRequest />
            },
            {
                path: 'favourite-data',
                element: <FavouriteBiodata />
            },
            {
                path: 'admin-dashboard',
                element: <AdminDashboard />
            },
            {
                path: 'manage-user',
                element: <ManageUser />
            },
            {
                path: 'approve-premium',
                element: <ApprovePremium />
            },
            {
                path: 'approve-request',
                element: <ApproveContactRequest />
            },
            {
                path: 'success-story-user',
                element: <SuccessStoryUser />
            },
            {
                path: 'success-story-admin',
                element: <SuccessStoryAdmin />
            },
        ]
    },
    {
        path: "*",
        element: <Error />,
    },
]);

export default router