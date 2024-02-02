import * as yup from "yup";
import { toast } from 'react-toastify';
import styled from "@emotion/styled";
import { columnsFromBackend } from "../components/KanbanData";
import TaskCard from "../components/TaskCard";
import { API_PATH } from '../services/Const';
import { PostApi } from '../services/ApiService';
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;


export default function TaskBoard(props) {

    const navigate = useNavigate();
    const [taskBoard, settaskBoard] = useState();

    const getTaskBoard = async () => {
        let tskbord = await PostApi(API_PATH.get_task_board);
        if (tskbord.status === 200) {
            toast.success(tskbord.data.message);
        }
    }
    const getTask = async () => {
        let tskbord = await PostApi(API_PATH.get_task_board);
        if (tskbord.status === 200) {
            toast.success(tskbord.data.message);
        }
    }
    const CreateTaskBoard = async () => {
        let tskbord = await PostApi(API_PATH.get_task_board);
        if (tskbord.status === 200) {
            toast.success(tskbord.data.message);
        }
    }

    useEffect(() => {
        // getTaskBoard();
        // getTask()
    })




    const columns1 = {
        1: {
            title: 'In Progress',
            items: [
                { id: '2', Task: 'In Progress 2', Due_Date: '26-May-2020' },
                { id: '1', Task: 'In Progress 1', Due_Date: '26-May-2020' }
            ]
        },
        2: {
            title: 'Pending',
            items: [
                { id: '2', Task: 'Pending 2', Due_Date: '26-May-2020' },
                { id: '1', Task: 'Pending 1', Due_Date: '26-May-2020' }
            ]
        },

    }

    const Logout = () => {
        localStorage.removeItem("token")
        navigate("/");
        toast.success("Logout");
    }


    const [columns, setColumns] = useState(columnsFromBackend);

    const onDragEnd = (result, columns, setColumns) => {
        console.log(result, columns, setColumns, "-----");
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">

                        <h3>
                            Tickets
                        </h3>
                    </div>
                    <div className="col-md-4 ">
                        <div className="d-flex justify-content-end">
                            <button onClick={() => Logout()} className="me-2">
                                logout
                            </button>
                            <button onClick={() => CreateTaskBoard()}>
                                Create TaskBoard
                            </button>
                        </div>

                    </div>
                </div>

            </div>
            {Object.entries(columns).length > 0 &&

                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                >
                    <Container>
                        <TaskColumnStyles>
                            {console.log(columns, "------columns")}
                            {Object.entries(columns).map(([columnId, column], index) => {
                                console.log([columnId, column], index)
                                return (
                                    <Droppable key={index} droppableId={columnId}>
                                        {(provided, snapshot) => (
                                            <TaskList
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                <Title>{column.title}</Title>
                                                {column.items.map((item, index) => (
                                                    <TaskCard key={index} item={item} index={index} />
                                                ))}
                                                {provided.placeholder}
                                            </TaskList>
                                        )}
                                    </Droppable>
                                );
                            })}
                        </TaskColumnStyles>
                    </Container>
                </DragDropContext>
            }


        </>

    )
}
