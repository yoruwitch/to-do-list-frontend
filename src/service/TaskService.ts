import { TaskData } from "../classes/TaskData";

export class TaskService {
    static url = "http://localhost:3000/tasks";
    static async createTask(taskData: TaskData) {
        try {
            const data = {
                title: taskData.title,
                description: taskData.description,
            };

            const res = await fetch(this.url, {
                method: "POST",
                headers: { "Content-type": "application/json;charset=UTF-8" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error("Request failed");
            }
        } catch (error) {
            console.error(error);
        }
    }

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

    static async updateTask(id: string, taskData: TaskData) {
        try {
            const res = await fetch(`${this.url}/${id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json;charset=UTF-8" },
                body: JSON.stringify({
                    title: taskData.title,
                    description: taskData.description,
                }),
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async deleteTask(id: string) {
        try {
            const res = await fetch(`${this.url}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }
        } catch (error) {
            console.error(error);
        }
    }
}
