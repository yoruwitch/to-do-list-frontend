import { TaskData } from "../classes/TaskData";

class TaskService {
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
                const errorData = await res.json();
                throw new Error(errorData.message);
            }

            return await res.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getTasks() {
        try {
            const res = await fetch(this.url);
            if (!res.ok) {
                const errorData = await res.json();

                throw new Error(errorData.message);
            }
            return await res.json();
        } catch (error) {
            console.error(error);
            throw error;
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
                const errorData = await res.json();

                throw new Error(errorData.message);
            }

            return await res.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async deleteTask(id: string) {
        try {
            const res = await fetch(`${this.url}/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errorData = await res.json();

                throw new Error(errorData.message);
            }

            return await res.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default TaskService;
