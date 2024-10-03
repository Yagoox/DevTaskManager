// src/pages/Panel/components/TaskTable.tsx

import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Task } from '../../../types';

interface TaskTableProps {
  tasks: Task[];
  onEditTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        if (task.id === undefined || task.id === null) {
          console.warn('Tarefa sem ID:', task);
          return null; // Evita renderizar tarefas sem ID
        }

        // Determinar a classe de status com base no status da tarefa
        let statusClass = '';
        switch (task.status) {
          case 'A Fazer':
            statusClass = 'status-todo';
            break;
          case 'Em Progresso':
            statusClass = 'status-inProgress';
            break;
          case 'Concluída':
            statusClass = 'status-completed';
            break;
          default:
            statusClass = 'bg-gray-200 text-gray-800 border-gray-200';
        }

        return (
          <div key={task.id} className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm border">
            <div className="flex items-center space-x-2">
              <h3 className="text-textPrimary font-medium">{task.name}</h3>
              <span className={`status-label ${statusClass}`}>
                {task.status}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onEditTask(task.id)}
                className="text-gray-500 hover:text-primary focus:outline-none"
                aria-label={`Editar tarefa ${task.name}`}
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-error hover:text-red-600 focus:outline-none"
                aria-label={`Excluir tarefa ${task.name}`}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskTable;
