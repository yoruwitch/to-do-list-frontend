import { useEffect, useState, SyntheticEvent } from "react";
import "./form.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { TaskData } from "../../classes/TaskData";
import { TaskService } from "../../service/TaskService";

function FormComponent({
    formData,
    onUpdateTask,
    onShowNotification,
}: {
    formData?: TaskData;
    onUpdateTask: (task: TaskData) => void;
    onShowNotification: (
        isError: boolean,
        title: string,
        message: string
    ) => void;
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (formData) {
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
            sendData();
        }
        setValidated(true);
    };

    const sendData = () => {
        if (!formData) {
            TaskService.createTask(new TaskData("", title, description))
                .then((res) => {
                    const task = new TaskData(
                        res.id,
                        res.title,
                        res.description
                    );
                    onUpdateTask(task);

                    // Configura a notificação de sucesso
                    onShowNotification(
                        false,
                        "Success",
                        "Task created successfully!"
                    );
                })
                .catch((error) => {
                    console.error(error);
                    // Configura a notificação de erro
                    onShowNotification(true, "Error", `Failed to create task. ${error}`);
                });
        } else {
            TaskService.updateTask(
                formData.id,
                new TaskData(formData.id, title, description)
            )
                .then(({ res }) => {
                    const task = new TaskData(
                        res.task.id,
                        res.task.title,
                        res.task.description
                    );
                    onUpdateTask(task);

                    onShowNotification(
                        false,
                        "Success",
                        "Task updated successfully!"
                    );
                })
                .catch((error) => {
                    console.error(error);
                    onShowNotification(true, "Error", `Failed to update task. ${error}`);
                });
        }
    };

    return (
        <>
            <section>
                <div className="form_container">
                    <Form
                        className="w-50"
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
                            <Button className="btn_add" type="submit">
                                <FontAwesomeIcon icon={faPlus} /> Add new task
                            </Button>
                        </div>
                    </Form>
                </div>
            </section>
        </>
    );
}

export default FormComponent;
