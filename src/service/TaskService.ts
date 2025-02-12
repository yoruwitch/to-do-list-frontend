import { TaskData } from "../classes/TaskData";

export class TaskService {
    static url = "http://localhost:3000/tasks";
    // async createTask(taskData: TaskData) {
    //     try {
    //         const res = await fetch(this.url);
    //         if (!res.ok) {
    //             throw new Error("Request failed");
    //         }
    //     } catch (error) {}
    // }

    static async getTasks() {
        try {
            const res = await fetch(this.url);
            if (!res.ok) {
                throw new Error("Request failed");
            }
            return await res.json();
        } catch (error) {
            console.error(error);
        }
    }
}
