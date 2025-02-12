import "./taskboard.css";
import CardTaskComponent from "./card/CardTaskComponent";
import { TaskService } from "../../service/TaskService";
import { TaskData } from "../../classes/TaskData";
import { useEffect, useState } from "react";

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
                        {/* <div className="empty_taskboard">
                            <span>You don't have a new task yet</span>
                        </div> */}
                        {!!tasks &&
                            tasks.length >= 1 &&
                            tasks.map((task) => {
                                return (
                                    <CardTaskComponent
                                        key={task.id}
                                        task={task}
                                    />
                                );
                            })}
                    </div>
                </div>
            </section>
        </>
    );
}

export default TaskBoardComponent;
