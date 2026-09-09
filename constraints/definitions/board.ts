import { ITaskStatus } from "./status";

export interface IBoard {
  id: string;
  name: string;
  description: string;
  created_at: string;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: ITaskStatus;
  board_id: string;
  created_at: string;
}
