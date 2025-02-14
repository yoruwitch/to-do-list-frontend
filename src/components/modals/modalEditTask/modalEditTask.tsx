
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TaskData } from "../../../classes/TaskData";
import FormComponent from "../../form/FormComponent";

function ModalEditTask({
    show,
    task,
    onUpdateTaskList,
    onClose,
}: {
    show: boolean;
    task: TaskData;
    onUpdateTaskList: (taskData: TaskData) => void;
    onClose: () => void;
}) {
    return (
        <Modal show={show} onHide={onClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormComponent
                    formData={task}
                    onUpdateTaskList={(taskData) => {
                        onUpdateTaskList(taskData);
                        onClose();
                    }}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                {/*
                <Button variant="danger" onClick={onConfirm}>
                    Confirm
                </Button>
                */}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditTask;
