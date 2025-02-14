class NotificationService {
    private static listeners: ((
        isError: boolean,
        title: string,
        message: string
    ) => void)[] = [];

    static subscribe(
        listener: (isError: boolean, title: string, message: string) => void
    ) {
        this.listeners.push(listener);
    }

    static unsubscribe(
        listener: (isError: boolean, title: string, message: string) => void
    ) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    static show(isError: boolean, title: string, message: string) {
        this.listeners.forEach((listener) => listener(isError, title, message));
    }
}

export default NotificationService;
