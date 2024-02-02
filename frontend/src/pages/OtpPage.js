import * as yup from "yup";
import { toast } from 'react-toastify';
import { API_PATH } from '../services/Const';
import { PostApi } from '../services/ApiService';
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function OtpPage() {

    const navigate = useNavigate();
    

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    


    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const emails = query.get('email');
        if (emails) setEmail(emails);
    });
    


    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleOTP = async (formData, resetForm) => {
        setLoading(true);
        const data = {
            email: formData.email,
            otp: formData.otp,
            password: formData.password
        }
        const users = await PostApi(API_PATH.forgot_password, data);
        if (users.status === 200) {
            console.log(users);
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
                            otp: "",
                            password: "",
                        }}
                        validationSchema={yup.object({
                            email: yup.string().email().required("Email is required"),
                            password: yup.string().required("Password is required"),
                            OTP: yup.string().required("OTP is required")
                        })}
                        onSubmit={(formData, { resetForm }) => {
                            handleOTP(formData, resetForm);
                        }}
                    >
                        {(runform) => (
                            <form className="shadow p-4 bg-white rounded col-sm-12 text-center" onSubmit={runform.handleSubmit}>
                                <div className="h4 mb-2 text-center">Sign In</div>
                                <label htmlFor="email" className='mb-2 text-center'>Email</label>
                                <Field className="mb-2" name="email" id="email" type="text" placeholder="Please enter email" />
                                <ErrorMessage className="mb-2" name="email" component="span" />
                                
                                <label htmlFor="password" className='mb-2 text-center'>Password</label>
                                <Field className="mb-2" name="password" id="password" type="text" placeholder="Please enter password" />
                                <ErrorMessage className="mb-2" name="password" component="span" />
                                
                                <label htmlFor="otp" className='mb-2 text-center'>OTP</label>
                                <Field className="mb-2" name="otp" id="otp" type="text" placeholder="Please enter otp" />
                                <ErrorMessage className="mb-2" name="otp" component="span" />

                                {!loading ? (
                                    <button className="w-100" variant="primary" type="submit">
                                        Send OTP
                                    </button>
                                ) : (
                                    <button className="w-100" variant="primary" type="submit" disabled>
                                        Sending OTP...
                                    </button>
                                )}
                                <div className="d-grid justify-content-end">
                                    <Link to="/login" className="text-muted px-0">
                                        Login
                                    </Link>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
