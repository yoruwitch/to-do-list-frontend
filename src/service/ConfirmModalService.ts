import { TaskData } from "../classes/TaskData";

export class ConfirmModalService {
    private static listeners: ((
        taskData: TaskData,
        onConfirm: () => void
    ) => void)[] = [];

    static subscribe(
        listener: (taskData: TaskData, onConfirm: () => void) => void
    ) {
        this.listeners.push(listener);
    }

    static unsubscribe(
        listener: (taskData: TaskData, onConfirm: () => void) => void
    ) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    static show(taskData: TaskData, onConfirm: () => void) {
        this.listeners.forEach((listener) => listener(taskData, onConfirm));
    }
}

// export ConfirmModalService;
