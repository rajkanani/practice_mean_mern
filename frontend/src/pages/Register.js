import * as yup from "yup";
import { toast } from 'react-toastify';
import { API_PATH } from '../services/Const';
import { PostApi } from '../services/ApiService';
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


export default function Register() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);



    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleLogin = async (formData, resetForm) => {
        setLoading(true);
        const data = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }
        const users = await PostApi(API_PATH.register, data);
        if (users.status === 200) {
            navigate("/login");
            toast.success(users.data.message);
        }
        await delay(500);
        setLoading(false);
    };

    return (
        <div className="sign-in__wrapper">
            <div className="sign-in__backdrop"></div>
            <div className="container-fluid">
                <div className="row">
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
                            <form className="shadow p-4 bg-white rounded col-sm-12 text-center" onSubmit={runform.handleSubmit}>
                                <div className="h4 mb-2 text-center">Sign Up</div>
                                <label htmlFor="name" className='mb-2 text-center'>Name</label>
                                <Field className="mb-2" name="name" id="name" type="text" placeholder="Please enter name" />
                                <ErrorMessage className="mb-2" name="name" component="span" />
                                
                                <label htmlFor="email" className='mb-2 text-center'>Email</label>
                                <Field className="mb-2" name="email" id="email" type="text" placeholder="Please enter email" />
                                <ErrorMessage className="mb-2" name="email" component="span" />
                                
                                <label htmlFor="password" className='mb-2 text-center'>Password</label>
                                <Field className="mb-2" name="password" id="password" type="text" placeholder="Please enter password" />
                                <ErrorMessage className="mb-2" name="password" component="span" />

                                {!loading ? (
                                    <button className="w-100" variant="primary" type="submit">
                                        Sign Up
                                    </button>
                                    ) : (
                                    <button className="w-100" variant="primary" type="submit" disabled>
                                        Signing Up...
                                    </button>
                                )}
                                <div className="d-grid justify-content-start">
                                    <Link to="/login"  className="text-muted px-0">
                                        Login
                                    </Link>
                                </div>
                                <div className="d-grid justify-content-end">
                                    <Link to="/forgot-password"  className="text-muted px-0">
                                        Forgot password?
                                    </Link>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
