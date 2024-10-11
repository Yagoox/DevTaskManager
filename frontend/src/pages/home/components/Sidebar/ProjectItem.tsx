// src/pages/Panel/components/ProjectItem.tsx

import React, { useState, useRef, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Project } from '../../../../types';


interface ProjectItemProps {
  project: Project;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <li
      className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
        isSelected
          ? 'border-l-4 border-primary bg-gray-50 text-primary'
          : 'hover:bg-gray-100 text-textPrimary'
      }`}
      onClick={() => onSelect(project.id!)}
    >
      <span className="font-medium">{project.name}</span>
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
                onEdit(project.id!);
              }}
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Editar
            </button>
            <button
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project.id!);
              }}
            >
              <TrashIcon className="h-4 w-4 mr-2 text-red-500" />
              Excluir
            </button>
          </div>
        )}
      </div>
    </li>
  );
};

export default ProjectItem;
