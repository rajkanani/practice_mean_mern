import * as yup from "yup";
import { toast } from 'react-toastify';
import { API_PATH } from '../Services/Const';
import { PostApi } from '../Services/ApiService';
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


export default function Login(props) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        let token = localStorage.getItem('token')
        if (token) {
            navigate("/task-board");
        }
    })

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleLogin = async (formData, resetForm) => {
        setLoading(true);
        const data = {
            email: formData.email,
            password: formData.password
        }
        const users = await PostApi(API_PATH.login, data);
        if (users.status === 200) {
            localStorage.removeItem("token")
            localStorage.setItem("token", 'Bearer ' + users.data.token);
            localStorage.setItem("profile", JSON.stringify(users.data.data));
            navigate("/task-board");
            toast.success(users.data.message);
        }
        await delay(500);
        setLoading(false);
    };

    return (
        <div className="container-fluid h-100">
            <div className="container-fluid h-100">
                <div className="col-md-3 mx-auto">
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={yup.object({
                            email: yup.string().email().required("Email is required"),
                            password: yup.string().required("Password is required"),
                        })}
                        onSubmit={(formData, { resetForm }) => {
                            handleLogin(formData, resetForm);
                        }}
                    >
                        {(runform) => (
                            <form className="shadow p-4 bg-white rounded row" onSubmit={runform.handleSubmit}>
                                <div className="col-md-12 text-center">
                                    <h2 className="h4 mb-2 ">Sign In</h2>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="email" className='mb-2 d-block'>Email</label>
                                    <Field className="mb-2 form-control" name="email" id="email" type="text" placeholder="Please enter email" />
                                    <ErrorMessage className="mb-2 text-danger" name="email" component="span" />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="password" className='mb-2 d-block'>Password</label>
                                    <Field className="mb-2 form-control" name="password" id="password" type="text" placeholder="Please enter password" />
                                    <ErrorMessage className="mb-2 text-danger" name="password" component="span" />

                                </div>


                                {!loading ? (
                                    <button className="w-100 btn btn-primary" variant="primary" type="submit">
                                        Log In
                                    </button>
                                ) : (
                                    <button className="w-100  btn btn-primary" variant="primary" type="submit" disabled="disabled">
                                        Logging In...
                                    </button>
                                )}
                                <div className="col-12 mt-3">
                                    <div className="d-flex">
                                        <Link to="/register" className="text-muted px-0 ">
                                            Sign Up
                                        </Link>
                                        <div className="d-grid justify-content-end ms-auto">
                                            <Link to="/forgot-password" className="text-muted px-0">
                                                Forgot password?
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                                
                            </form>

                        )}
                    </Formik>
                </div>
            </div>
        </div>

    );
}
