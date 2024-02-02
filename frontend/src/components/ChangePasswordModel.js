import * as yup from "yup";
import { toast } from 'react-toastify';
import { API_PATH } from '../Services/Const';
import { PostApi } from '../Services/ApiService';
import { ErrorMessage, Field, Formik } from "formik";
import { Modal} from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';


const CreateTaskBoardModel = ({ showModal, handleClose }) => {
    const [loading, setLoading] = useState(false);


    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleCreateTask = async (formData, resetForm) => {
        setLoading(true);
        const data = {
            password: formData.password,
            old_password: formData.old_password
        }
        const users = await PostApi(API_PATH.reset_password, data);
        if (users.status === 200) {
            toast.success(users.data.message);
        }
        await delay(500);
        setLoading(false);
        handleClose(); 
    };

  return (
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid h-100">
                <div className="container-fluid h-100">
                    <div className="col-md-12 mx-auto">
                        <Formik
                            initialValues={{
                                password: "",
                                old_password: "",
                            }}
                            validationSchema={yup.object({
                                password: yup.string().required("Password is required"),
                                old_password: yup.string().required("Old password is required"),
                            })}
                            onSubmit={(formData, { resetForm }) => {
                                handleCreateTask(formData, resetForm);
                            }}
                        >
                            {(runform) => (
                                <form className="shadow p-4 bg-white rounded row" onSubmit={runform.handleSubmit}>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="old_password" className='mb-2 d-block'>Old Password</label>
                                        <Field className="mb-2 form-control" name="old_password" id="old_password" type="text" placeholder="Please enter old password" />
                                        <ErrorMessage className="mb-2 text-danger" name="old_password" component="span" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="password" className='mb-2 d-block'>New Password</label>
                                        <Field className="mb-2 form-control" name="password" id="password" type="text" placeholder="Please enter new name" />
                                        <ErrorMessage className="mb-2 text-danger" name="password" component="span" />
                                    </div>
                                    {!loading ? (
                                        <button className="w-100 btn btn-primary" variant="primary" type="submit">
                                            Reset Password
                                        </button>
                                    ) : (
                                        <button className="w-100  btn btn-primary" variant="primary" type="submit" disabled="disabled">
                                            Reseting Password...
                                        </button>
                                    )}
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal>
  );
};

export default CreateTaskBoardModel;
