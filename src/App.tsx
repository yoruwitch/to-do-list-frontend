import "./App.css";
import { TaskData } from "./classes/TaskData";
import FormComponent from "./components/form/FormComponent";
import NavbarComponent from "./components/navbar/NavbarComponent";
import TaskBoardComponent from "./components/taskboard/TaskBoardComponent";
import { useEffect, useState } from "react";
import { TaskService } from "./service/TaskService";
import NotificationComponent from "./components/notification/NotificationComponent";
import ModalConfirmDelete from "./components/modals/modalConfirmDelete/modalConfirmDelete";
// import ModalEditTask from "./components/modals/modalEditTask/modalEditTask";

function App() {
    const [tasks, setTasks] = useState<TaskData[]>([]);

    useEffect(() => {
        TaskService.getTasks().then((res) => {
            setTasks(res);
        });
    }, []);

    const handleUpdateTask = (updatedTask: TaskData) => {
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
            <FormComponent onUpdateTaskList={handleUpdateTask} />
            <TaskBoardComponent tasks={tasks} onDeleteTask={handleDeleteTask} />

            <NotificationComponent />
            <ModalConfirmDelete />
            {/*
            <ModalEditTask
                show={true}
                task={tasks[0]}
                onClose={() => {}}
                onUpdateTask={(task) => console.log(task)}
            />
             */}
        </>
    );
}

export default App;
