import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "react-bootstrap";
import "./card.css";
import { TaskData } from "../../../classes/TaskData";

function CardTaskComponent({ task }: { task: TaskData }) {
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
                        <Button variant="danger">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardTaskComponent;
