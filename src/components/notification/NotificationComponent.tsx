import { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function NotificationComponent({
    isError,
    title,
    message,
    show,
    onClose,
}: {
    isError: boolean;
    title: string;
    message: string;
    show: boolean;
    onClose: () => void;
}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <ToastContainer
            className="p-3 position-fixed text-white"
            position="top-end"
            style={{ zIndex: 1 }}
        >
            <Toast
                onClose={() => onClose()}
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
