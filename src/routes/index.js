//Dùng để định hướng trang, list ra những trang cần đăng nhập trong private

import { DefaultLayout, NoCompLayout } from "../component/Layout";
import TransHeaderLayout from "../component/Layout/TransHeaderLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const publicRoutes = [
    { path: '/', component: Login, layout: NoCompLayout},
    { path: '/signup', component: Signup, layout: NoCompLayout},
    { path: '/home', component: Home, layout: TransHeaderLayout},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
