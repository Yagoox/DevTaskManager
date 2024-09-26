// frontend/src/pages/Panel/components/TaskTable.tsx

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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Tarefas</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Tarefa</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">{task.name}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'Concluída'
                        ? 'bg-green-100 text-green-800'
                        : task.status === 'Em Progresso'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex items-center space-x-2">
                  <button
                    onClick={() => onEditTask(task.id)}
                    className="text-gray-500 hover:text-primary focus:outline-none"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-600 focus:outline-none"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
