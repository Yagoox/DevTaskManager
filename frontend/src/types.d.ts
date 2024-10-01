// frontend/src/types.ts

export interface Task {
  id: number;
  name: string;
  status: string;
}

export interface Project {
  id: number;
  name: string;
  tasks: Task[]; // Assegure-se de que tasks é um array de Task
}

export interface NotificationType {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
