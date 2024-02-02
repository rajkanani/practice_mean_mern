import { toast } from 'react-toastify';
import styled from "@emotion/styled";
import CreateTaskBoardModel from '../components/CreateTaskBoardModel';
import CreateTaskModel from '../components/CreateTaskModel';
import { columnsFromBackend } from "../components/KanbanData";
import TaskCard from "../components/TaskCard";
import { API_PATH, ApiBaseUrl } from '../Services/Const';
import { PostApi } from '../Services/ApiService';
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
    const [profilePic, setprofilePic] = useState();
    const [profileName, setprofileName] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [taskBoardId, settaskBoardId] = useState("");
    const [taskBoardName, settaskBoardName] = useState("");

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleShow1 = (taskboardIds, taskboardnames) => {
        settaskBoardId(taskboardIds)
        settaskBoardName(taskboardnames)
        setShowModal1(true)
    };
    const handleClose1 = () => setShowModal1(false);


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
    

    const getProfile = async () => {
        let profile = await localStorage.getItem('profile');
        if(profile){
            setprofileName(JSON.parse(profile).name)
            setprofilePic(ApiBaseUrl + 'public/images/' + JSON.parse(profile).image)
        }
    }

    useEffect(() => {
        // getTaskBoard();
        // getTask();
        getProfile();
        

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
                    <div className="col-md-9">
                        <h3>
                            TaskBoard
                        </h3>
                    </div>
                    <div className="col-md-2">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="container text-center">
                                    <img src={profilePic} alt="Profile Picture" class="img-fluid rounded-circle profile-button" data-bs-toggle="modal" data-bs-target="#profileModal" />
                                </div>
                            </div>
                            <div class="col-md-4">
                                <Link to="/edit-profile" className="text-muted px-0 ">
                                    {profileName}
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="d-flex justify-content-end">
                            <button className="me-2 btn btn-danger" onClick={() => Logout()} >
                                logout
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div class="row">
                <div className="col-md-10"></div>
                <div className="col-md-2">
                    <div className="d-flex justify-content-end">
                        <button className="me-2 btn btn-primary" onClick={() => handleShow()}>
                            Create TaskBoard
                        </button>
                    </div>
                </div>
            </div>
            {Object.entries(columns).length > 0 &&

                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)} >
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
                                                <button type="button" class="btn btn-success" onClick={() => handleShow1('taskboardId', 'taskboardname')}>
                                                    Add Task
                                                </button>
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
            <CreateTaskBoardModel showModal={showModal} handleClose={handleClose} />
            <CreateTaskModel showModal={showModal1} handleClose={handleClose1} taskBoardName={taskBoardName} taskBoardId={taskBoardId} />
        </>

    )
}
