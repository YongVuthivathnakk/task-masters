import { ITaskStatus } from "./status";

export interface ITask {
    id: number | string;
    name: string;
    description: string;
    icon: string;
    status: ITaskStatus
}