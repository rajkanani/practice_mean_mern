import * as yup from "yup";
import { toast } from 'react-toastify';
import { API_PATH } from '../Services/Const';
import { PostApi } from '../Services/ApiService';
import { ErrorMessage, Field, Formik } from "formik";
import { Modal} from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';


const CreateTaskBoardModel = ({ showModal, handleClose, getNewTaskBoard }) => {
    const [loading, setLoading] = useState(false);


    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleCreateTask = async (formData, resetForm) => {
        setLoading(true);
        const data = {
            name: formData.name,
            desctiption: ""
        }
        const users = await PostApi(API_PATH.create_task_board, data);
        if (users.status === 200) {
            getNewTaskBoard(users.data.data)
            toast.success(users.data.message);
        }
        await delay(500);
        setLoading(false);
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
                                handleCreateTask(formData, resetForm);
                            }}
                        >
                            {(runform) => (
                                <form className="shadow p-4 bg-white rounded row" onSubmit={runform.handleSubmit}>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="name" className='mb-2 d-block'>TaskBoard Name</label>
                                        <Field className="mb-2 form-control" name="name" id="name" type="text" placeholder="Please enter taskboard name" />
                                        <ErrorMessage className="mb-2 text-danger" name="name" component="span" />
                                    </div>
                                    {!loading ? (
                                        <button className="w-100 btn btn-primary" variant="primary" type="submit">
                                            Create TaskBoard
                                        </button>
                                    ) : (
                                        <button className="w-100  btn btn-primary" variant="primary" type="submit" disabled="disabled">
                                            Creating...
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
