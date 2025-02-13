import "./App.css";
import { TaskData } from "./classes/TaskData";
import FormComponent from "./components/form/FormComponent";
import NavbarComponent from "./components/navbar/NavbarComponent";
import TaskBoardComponent from "./components/taskboard/TaskBoardComponent";
import { useEffect, useState } from "react";
import { TaskService } from "./service/TaskService";

function App() {
    const [tasks, setTasks] = useState<TaskData[]>([]);

    useEffect(() => {
        TaskService.getTasks().then((res) => {
            setTasks(res);
        });
    }, []);

    const handleUpdateTask = (updatedTask: TaskData) => {
        console.log(updatedTask);

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
    }

    return (
        <>
            <NavbarComponent />
            <FormComponent onUpdateTask={handleUpdateTask} />
            <TaskBoardComponent tasks={tasks} onDeleteTask={handleDeleteTask} />
        </>
    );
}

export default App;
