import "./taskboard.css";
import CardTaskComponent from "./card/CardTaskComponent";
import { TaskService } from "../../service/TaskService";
import { TaskData } from "../../classes/TaskData";
import { useEffect, useState } from "react";
import NoTasksComponent from "../notasks/NoTasksComponent";

function TaskBoardComponent() {
    const [tasks, setTasks] = useState<TaskData[]>([]);

    useEffect(() => {
        TaskService.getTasks().then((res) => {
            setTasks(res);
        });
    }, [TaskService]);
    return (
        <>
            <section>
                <div className="taskboard_container">
                    <h2 className="taskboard_title">Tasks</h2>
                    <div className="card_container">
                        
                        {(tasks ?? []).length > 0 ? (
                            tasks.map((task) => (
                                <CardTaskComponent key={task.id} task={task} />
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
