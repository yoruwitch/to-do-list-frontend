import { TaskData } from "../classes/TaskData";

class EditModalService {
    private static listeners: ((taskData: TaskData) => void)[] = [];

    static subscribe(listener: (taskData: TaskData) => void) {
        this.listeners.push(listener);
    }

    static unsubscribe(listener: (taskData: TaskData) => void) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    static show(taskData: TaskData) {
        this.listeners.forEach((listener) => listener(taskData));
    }
}

export default EditModalService;
