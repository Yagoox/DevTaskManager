export interface Project {
    id: number;
    name: string;
  }
  
  export interface Task {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    completed: boolean;
  }
  