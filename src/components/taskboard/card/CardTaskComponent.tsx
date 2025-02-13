import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "react-bootstrap";
import "./card.css";
import { TaskData } from "../../../classes/TaskData";
import { TaskService } from "../../../service/TaskService";
import { NotificationService } from "../../../service/NotificationService";
import { ConfirmModalService } from "../../../service/ConfirmModalService";

function CardTaskComponent({
    task,
    onDeleteTask,
}: {
    task: TaskData;
    onDeleteTask: (taskId: string) => void;
}) {
    const confirmDelete = () => {
        ConfirmModalService.show(task, deleteTask);
    };

    const deleteTask = () => {
        TaskService.deleteTask(task.id)
            .then(() => {
                NotificationService.show(
                    false,
                    "Success",
                    "The task was deleted successfully!"
                );
                onDeleteTask(task.id);
            })
            .catch((error) => {
                NotificationService.show(
                    true,
                    "Error",
                    `Failed to delete task. ${error}`
                );
            });
    };

    return (
        <>
            <Card style={{ width: "10rem" }} className="card_item">
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                    <div className="btn_container">
                        <Button variant="success">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => confirmDelete()}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardTaskComponent;
