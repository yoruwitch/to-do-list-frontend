import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
function FormComponent() {
    return (
        <>
            <section>
                <div className="form_container">
                    <Form className="w-50">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="form_title">
                                Title
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ex: Learn NestJS"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label className="form_title">
                                Description
                            </Form.Label>
                            <Form.Control
                                className="form_description"
                                as="textarea"
                                rows={2}
                                placeholder="Ex: Study NestJs course from Alura, third module."
                            />
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
