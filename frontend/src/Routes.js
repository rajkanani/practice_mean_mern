import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';


const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const TaskBoard = lazy(() => import("./pages/TaskBoard"));
const CreateTicket = lazy(() => import("./pages/CreateTicket"));
const Users = lazy(() => import("./pages/Users"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const OtpPage = lazy(() => import("./pages/OtpPage"));
const NotFound = lazy(() => import("./pages/NotFound"));


function Authorization() {
    let token = localStorage.getItem("token");
    return token && token !== "" ? <Outlet /> : <Navigate to={"/login"} />;
}


function MainRoutes(props) {
    return (
        <BrowserRouter>
            <Suspense>
                <Routes>
                    <Route path="/" strict element={<Login />} />
                    <Route path="/login" strict element={<Login />} />
                    <Route path="/register" strict element={<Register />} />
                    <Route element={<Authorization />}>
                        <Route path="/task-board" strict element={<TaskBoard />} />
                        <Route path='/users' strict element={<Users />} />
                        <Route path="/create-ticket" strict element={<CreateTicket />} />
                        <Route path="/change-password" strict element={<ChangePassword />} />
                        <Route path="/edit-profile" strict element={<EditProfile />} />
                    </Route>
                    <Route path="/forgot-password" exact element={<ForgotPassword />} />
                    <Route path="/reset-password" exact element={<ResetPassword />} />
                    <Route path="/otp-page" exact element={<OtpPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default MainRoutes;