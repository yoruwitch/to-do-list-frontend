import { useEffect, useState, SyntheticEvent } from "react";
import "./form.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faPencil } from "@fortawesome/free-solid-svg-icons/faPencil";
import { TaskData } from "../../classes/TaskData";
import TaskService from "../../services/TaskService";
import NotificationService from "../../services/NotificationService";
import SpinnerComponent from "../spinner/SpinnerComponent";

function FormComponent({
    formData,
    onUpdateTaskList,
}: {
    formData?: TaskData;
    onUpdateTaskList: (task: TaskData) => void;
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (formData) {
            setIsEdit(true);
            setTitle(formData.title);
            setDescription(formData.description);
        }
    }, [formData]);

    const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setIsLoading(true);
            sendData();
        }
        setValidated(true);
    };

    const sendData = () => {
        setIsLoading(true);
        if (!formData) {
            TaskService.createTask(new TaskData("", title, description))
                .then((res) => {
                    const task = new TaskData(
                        res.id,
                        res.title,
                        res.description
                    );

                    clearForm();
                    setIsLoading(false);
                    onUpdateTaskList(task);

                    // Configures the success notification
                    NotificationService.show(
                        false,
                        "Success",
                        "Task created successfully!"
                    );
                })
                .catch((error) => {
                    // Configures the error notification
                    NotificationService.show(
                        true,
                        "Error",
                        `Failed to create task. ${error}`
                    );
                    setIsLoading(false);
                });
        } else {
            TaskService.updateTask(
                formData.id,
                new TaskData(formData.id, title, description)
            )
                .then((res) => {
                    const task = new TaskData(
                        formData.id,
                        res.task.title,
                        res.task.description
                    );
                    clearForm();
                    setIsLoading(false);
                    onUpdateTaskList(task);

                    NotificationService.show(
                        false,
                        "Success",
                        "Task updated successfully!"
                    );
                })
                .catch((error) => {
                    NotificationService.show(
                        true,
                        "Error",
                        `Failed to update task. ${error}`
                    );
                    setIsLoading(false);
                });
        }
    };

    const clearForm = () => {
        setTitle("");
        setDescription("");
    }

    return (
        <>
            <section>
                <div className="form_container">
                    <Form
                        className="form_container_item"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label className="form_title">
                                Title
                            </Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Ex: Learn NestJS"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid title.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formDescription"
                        >
                            <Form.Label className="form_title">
                                Description
                            </Form.Label>
                            <Form.Control
                                required
                                className="form_description"
                                as="textarea"
                                rows={2}
                                placeholder="Ex: Study NestJs course from Alura, third module."
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid description.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="btn_container">
                            <Button
                                className="btn_add"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <SpinnerComponent />
                                ) : (
                                    <>
                                        <FontAwesomeIcon
                                            icon={isEdit ? faPencil : faPlus}
                                        />
                                        {isEdit
                                            ? " Update task"
                                            : " Add new task"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </Form>
                </div>
            </section>
        </>
    );
}

export default FormComponent;
