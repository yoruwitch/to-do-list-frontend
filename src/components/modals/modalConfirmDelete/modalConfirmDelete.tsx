import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ConfirmModalService from "../../../service/ConfirmModalService";
import { TaskData } from "../../../classes/TaskData";

function ModalConfirmDelete() {
    const [show, setShow] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

    useEffect(() => {
        const handleModal = (task: TaskData, onConfirm: () => void) => {
            setTaskTitle(task.title);
            setOnConfirm(() => onConfirm);
            setShow(true);
        };

        ConfirmModalService.subscribe(handleModal);
        // Anonimous function to clean up the component renderization, "sign out"
        return () => ConfirmModalService.unsubscribe(handleModal);
    }, []);

    const closeModal = () => {
        setShow(false);
    };

    return (
        <Modal show={show} onHide={closeModal} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                    Are you sure you want to delete the task
                    <strong> " {taskTitle}"</strong>?
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        onConfirm();
                        closeModal();
                    }}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirmDelete;
