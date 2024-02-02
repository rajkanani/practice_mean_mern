import * as yup from "yup";
import { toast } from 'react-toastify';
import { API_PATH } from '../services/Const';
import { PostApi } from '../services/ApiService';
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


export default function Tickets() {

    const navigate = useNavigate();

    const Logout = () => {

        localStorage.removeItem("token")
        navigate("/");
        toast.success("Logout");
    }
    return (
        <>
            <div>
                Tickets
            </div>
            <button onClick={() => Logout()}>
                logout
            </button>
        </>

    )
}
