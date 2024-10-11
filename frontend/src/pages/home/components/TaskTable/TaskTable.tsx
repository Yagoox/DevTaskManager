// src/pages/Panel/components/TaskTable.tsx

import React from 'react';
import { Task } from '../../../../types';
import TaskItem from './TaskItem';

interface TaskTableProps {
  tasks: Task[];
  onEditTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskTable;
