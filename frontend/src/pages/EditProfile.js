import * as yup from "yup";
import { toast } from 'react-toastify';
import { API_PATH, ApiBaseUrl } from '../Services/Const';
import { PostApi } from '../Services/ApiService';
import UpdateProfileModel from '../components/UpdateProfileModel';
import ChangePasswordModel from '../components/ChangePasswordModel';
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function EditProfile(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [name, setname] = useState(false);
    const [email, setemail] = useState(false);
    const [image, setimage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleShow1 = () => setShowModal1(true);
    const handleClose1 = () => setShowModal1(false);

    const getProfile = async () => {
        const users = await PostApi(API_PATH.get_profile);
        if (users.status === 200) {
            console.log(users.data);
            setname(users.data.data.name)
            setemail(users.data.data.email)
            setimage(ApiBaseUrl + 'public/images/' + users.data.data.image)
            toast.success(users.data.message);
        }
    }

    useEffect(()=> {
        getProfile()
    },[props])

    const retain = () => {
        getProfile()
    }
    
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="card">
                            <img src={image} className="card-img-top" alt="Profile" />
                            <div className="card-body">
                                <h5 className="card-title">{name}</h5>
                                <p className="card-text">{email}</p>
                            </div>
                            <div className="row">
                                <div className="col-md-6 ">
                                    <button className="me-auto btn btn-primary" onClick={() => handleShow()}>
                                        Edit Profile
                                    </button>
                                </div>
                                <div className="col-md-6 ">
                                    <button className="ms-auto btn btn-primary" onClick={() => handleShow1()}>
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UpdateProfileModel showModal={showModal} handleClose={handleClose} retain={retain} />
            <ChangePasswordModel showModal={showModal1} handleClose={handleClose1} />
        </>
    )
}
