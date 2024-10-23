// frontend/src/types.ts

export interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface Project {
  id: number;
  name: string;
  tasks: Task[]; 
}

export interface NotificationType {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
