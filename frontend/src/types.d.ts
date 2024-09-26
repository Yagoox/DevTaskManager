// frontend/src/types.ts

export interface Task {
  id: number;
  name: string;
  status: string;
}

export interface Project {
  id: number;
  name: string;
  tasks: Task[];
}
