import "./App.css";
import { TaskData } from "./classes/TaskData";
import FormComponent from "./components/form/FormComponent";
import NavbarComponent from "./components/navbar/NavbarComponent";
import TaskBoardComponent from "./components/taskboard/TaskBoardComponent";
import { useEffect, useState } from "react";
import { TaskService } from "./service/TaskService";
import NotificationComponent from "./components/notification/NotificationComponent";

function App() {
    const [tasks, setTasks] = useState<TaskData[]>([]);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [messageNotification, setMessageNotification] = useState<string>("");
    const [titleNotification, setTitleNotification] = useState<string>("");
    const [isErrorNotification, setIsErrorNotification] =
        useState<boolean>(false);

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

    const onShowNotification = (
        isError: boolean,
        title: string,
        message: string
    ) => {
        setIsErrorNotification(isError);
        setTitleNotification(title);
        setMessageNotification(message);
        setShowNotification(true);
    };

    return (
        <>
            <NavbarComponent />
            <FormComponent onUpdateTask={handleUpdateTask} onShowNotification={onShowNotification} />
            <TaskBoardComponent tasks={tasks} onDeleteTask={handleDeleteTask} onShowNotification={onShowNotification} />
            <NotificationComponent
                show={showNotification}
                isError={isErrorNotification}
                title={titleNotification}
                message={messageNotification}
                onClose={() => setShowNotification(false)}
            />
        </>
    );
}

export default App;
