import "./App.css";
import { TaskData } from "./classes/TaskData";
import FormComponent from "./components/form/FormComponent";
import NavbarComponent from "./components/navbar/NavbarComponent";
import TaskBoardComponent from "./components/taskboard/TaskBoardComponent";
import { useEffect, useState } from "react";
import TaskService from "./services/TaskService";
import NotificationComponent from "./components/notification/NotificationComponent";
import ModalConfirmDeleteComponent from "./components/modals/modalConfirmDelete/odalConfirmDeleteComponent";
import ModalEditTaskComponent from "./components/modals/modalEditTask/ModalEditTaskComponent";
import Footer from "./components/footer/FooterComponent";

function App() {
    const [tasks, setTasks] = useState<TaskData[]>([]);

    useEffect(() => {
        TaskService.getTasks().then((res) => {
            setTasks(res);
        });
    }, []);

    const handleUpdateTasks = (updatedTask: TaskData) => {
        setTasks((prevList) => {
            const taskExists = prevList.some(
                (task) => task.id === updatedTask.id
            );

            if (taskExists) {
                // updates task that already exists
                return prevList.map((task) =>
                    task.id === updatedTask.id
                        ? { ...task, ...updatedTask }
                        : task
                );
            } else {
                // adds updatedTask to end
                return [...prevList, updatedTask];
            }
        });
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks((prevList) => prevList.filter((task) => task.id !== taskId));
    };

    return (
        <>
            <NavbarComponent />
            <FormComponent onUpdateTaskList={handleUpdateTasks} />
            <TaskBoardComponent tasks={tasks} onDeleteTask={handleDeleteTask} />
            <Footer/>

            <NotificationComponent />
            <ModalConfirmDeleteComponent />

            <ModalEditTaskComponent onUpdateTaskList={handleUpdateTasks} />

        </>
    );
}

export default App;
