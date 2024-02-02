import * as yup from "yup";
import { toast } from 'react-toastify';
import { API_PATH } from '../Services/Const';
import { PostApi, PostApiFormdata } from '../Services/ApiService';
import { ErrorMessage, Field, Formik } from "formik";
import { Modal} from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';


const CreateTaskBoardModel = ({ showModal, handleClose, retain }) => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleUpdateProfile = async (formData, resetForm) => {
        setLoading(true);
        const FormDatas = new FormData();
        FormDatas.append('file', file);
        FormDatas.append('name', formData.name);
        
        const users = await PostApiFormdata(API_PATH.update_profile, FormDatas);
        if (users.status === 200) {
            toast.success(users.data.message);
        }
        await delay(500);
        setLoading(false);
        retain();
        handleClose(); 
    };

  return (
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Create TaskBoard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid h-100">
                <div className="container-fluid h-100">
                    <div className="col-md-12 mx-auto">
                        <Formik
                            initialValues={{
                                name: ""
                            }}
                            validationSchema={yup.object({
                                name: yup.string().required("TaskBoard name is required"),
                            })}
                            onSubmit={(formData, { resetForm }) => {
                                handleUpdateProfile(formData, resetForm);
                            }}
                        >
                            {(runform) => (
                                <form className="shadow p-4 bg-white rounded row" onSubmit={runform.handleSubmit}>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="name" className='mb-2 d-block'>Name</label>
                                        <Field className="mb-2 form-control" name="name" id="name" type="text" placeholder="Please enter name" />
                                        <ErrorMessage className="mb-2 text-danger" name="name" component="span" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="image" className='mb-2 d-block'>Profile picture</label>
                                        <Field className="mb-2 form-control" name="image" id="image" onChange={handleFileChange} type="file" accept="image/png, image/gif, image/jpeg"/>
                                        <ErrorMessage className="mb-2 text-danger" name="image" component="span" />
                                    </div>
                                    {!loading ? (
                                        <button className="w-100 btn btn-primary" variant="primary" type="submit">
                                            Update Profile
                                        </button>
                                    ) : (
                                        <button className="w-100  btn btn-primary" variant="primary" type="submit" disabled="disabled">
                                            Updating Profile...
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
