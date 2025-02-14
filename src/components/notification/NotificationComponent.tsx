import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import NotificationService from "../../services/NotificationService";

function NotificationComponent() {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const handleNotification = (err: boolean, ttl: string, msg: string) => {
            setMessage(msg);
            setTitle(ttl);
            setIsError(err);
            setShow(true);

            // Auto-hide after 3 seconds
            setTimeout(() => setShow(false), 3000);
        };

        NotificationService.subscribe(handleNotification);
        return () => NotificationService.unsubscribe(handleNotification);
    }, []);

    return (
        <ToastContainer
            className="p-3 position-fixed text-white"
            position="top-end"
            style={{ zIndex: 2000 }}
        >
            <Toast
                onClose={() => setShow(false)}
                show={show}
                bg={isError ? "danger" : "success"}
            >
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default NotificationComponent;
