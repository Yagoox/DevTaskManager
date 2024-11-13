import React, { useState, useRef, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Task } from '../../../../types';

interface TaskItemProps {
  task: Task;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className="flex flex-col p-4 bg-white rounded-md shadow-sm border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-textPrimary font-medium">{task.name}</h3>
          <span className={`status-label ${statusClass}`}>{task.status}</span>
        </div>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-5 text-black-500 hover:text-primary cursor-pointer"
            onClick={toggleDropdown}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5"
            >
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task.id!);
                }}
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Editar
              </button>
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id!);
                }}
              >
                <TrashIcon className="h-4 w-4 mr-2 text-red-500" />
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="mt-2 text-gray-600">{task.description}</p>
    </div>
  );
};

export default TaskItem;
