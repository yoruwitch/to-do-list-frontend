import "./taskboard.css";
import CardTaskComponent from "./card/CardTaskComponent";
import NoTasksComponent from "../notasks/NoTasksComponent";
import { TaskData } from "../../classes/TaskData";
import { useEffect, useState } from "react";
import SpinnerComponent from "../spinner/SpinnerComponent";

function TaskBoardComponent({
    tasks,
    onDeleteTask,
}: {
    tasks: TaskData[];
    onDeleteTask: (taskId: string) => void;
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <section>
                <div className="taskboard_container">
                    <h2 className="taskboard_title">Tasks</h2>
                    <div className="card_container">
                        {isLoading ? (
                            <SpinnerComponent />
                        ) : (tasks ?? []).length > 0 ? (
                            tasks.map((task) => (
                                <CardTaskComponent
                                    key={task.id}
                                    task={task}
                                    onDeleteTask={onDeleteTask}
                                />
                            ))
                        ) : (
                            <NoTasksComponent />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default TaskBoardComponent;
