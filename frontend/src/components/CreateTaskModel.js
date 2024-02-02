import * as yup from "yup";
import { toast } from 'react-toastify';
import { API_PATH } from '../Services/Const';
import { PostApi } from '../Services/ApiService';
import { ErrorMessage, Field, Formik } from "formik";
import { Modal} from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';


const CreateTaskModel = ({ showModal, handleClose, taskBoardId }) => {
    const [loading, setLoading] = useState(false);


    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleCreateTask = async (formData, resetForm) => {
        setLoading(true);
        const data = {
            task_board_id: taskBoardId,
            name: formData.name,
            description: formData.description
        }
        const users = await PostApi(API_PATH.create_task, data);
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
            <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid h-100">
                <div className="container-fluid h-100">
                    <div className="col-md-12 mx-auto">
                        <Formik
                            initialValues={{
                                name: "",
                                description: ""
                            }}
                            validationSchema={yup.object({
                                name: yup.string().required("Task name is required"),
                                description: yup.string(),
                            })}
                            onSubmit={(formData, { resetForm }) => {
                                handleCreateTask(formData, resetForm);
                            }}
                        >
                            {(runform) => (
                                <form className="shadow p-4 bg-white rounded row" onSubmit={runform.handleSubmit}>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="name" className='mb-2 d-block'>Task Name</label>
                                        <Field className="mb-2 form-control" name="name" id="name" type="text" placeholder="Please enter task name" />
                                        <ErrorMessage className="mb-2 text-danger" name="name" component="span" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="description" className='mb-2 d-block'>Description</label>
                                        <Field className="mb-2 form-control" name="description" id="description" type="text" placeholder="Please enter description" />
                                        <ErrorMessage className="mb-2 text-danger" name="description" component="span" />
                                    </div>
                                    {!loading ? (
                                        <button className="w-100 btn btn-primary" variant="primary" type="submit">
                                            Create Task
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

export default CreateTaskModel;
