import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormComponent from "../../form/FormComponent";
import { useEffect, useState } from "react";
import { TaskData } from "../../../classes/TaskData";
import EditModalService from "../../../services/EditModalService";

function ModalEditTaskComponent({
    onUpdateTaskList,
}: {
    onUpdateTaskList: (taskData: TaskData) => void;
}) {
    const [show, setShow] = useState(false);
    const [taskData, setTaskData] = useState<TaskData>();

    useEffect(() => {
        const handleModal = (task: TaskData) => {
            setTaskData(task);
            setShow(true);
        };

        EditModalService.subscribe(handleModal);

        return () => EditModalService.unsubscribe(handleModal);
    }, []);

    const closeModal = () => {
        setShow(false);
    };

    return (
        <Modal show={show} onHide={closeModal} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormComponent
                    formData={taskData}
                    onUpdateTaskList={(task) => {
                        onUpdateTaskList(task);
                        closeModal();
                    }}
                />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditTaskComponent;
