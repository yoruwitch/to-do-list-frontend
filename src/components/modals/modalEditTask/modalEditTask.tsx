// import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TaskData } from "../../../classes/TaskData";
import FormComponent from "../../form/FormComponent";

function ModalEditTask({
    show,
    task,
    onUpdateTask,
    onClose,
}: {
    show: boolean;
    task: TaskData;
    onUpdateTask: (taskData: TaskData) => void;
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
                    onUpdateTask={(taskData) => {
                        onUpdateTask(taskData);
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
