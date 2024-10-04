import React, { useState, useRef, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Project } from '../../../types';

interface SidebarProps {
  projects: Project[];
  selectedProjectId: number | null;
  onSelectProject: (id: number) => void;
  onAddProject: () => void;
  onEditProject: (id: number) => void;
  onDeleteProject: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onAddProject,
  onEditProject,
  onDeleteProject,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside className="w-64 bg-surface border-r border-gray-200 rounded-lg shadow-md">
      <div className="px-6 py-6">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h2 className="text-lg font-bold text-textPrimary">Projetos</h2>
          <button
            onClick={onAddProject}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        <ul className="space-y-3">
          {projects.map((project) => {
            if (project.id === undefined || project.id === null) {
              console.warn('Projeto sem ID:', project);
              return null;
            }

            const isSelected = project.id === selectedProjectId;

            return (
              <li
                key={project.id}
                className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-l-4 border-primary bg-gray-50 text-primary'
                    : 'hover:bg-gray-100 text-textPrimary'
                }`}
                onClick={() => onSelectProject(project.id)}
              >
                <span className="font-medium">{project.name}</span>

                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    className="h-4 w-4 text-gray-500 hover:text-primary cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(project.id);
                    }}
                  >
                    <path d="M 13.486328 12.978516 A 1.50015 1.50015 0 0 0 12.439453 13.439453 L 2.4394531 23.439453 A 1.50015 1.50015 0 0 0 2.4394531 25.560547 L 12.439453 35.560547 A 1.50015 1.50015 0 1 0 14.560547 33.439453 L 7.1210938 26 L 40.878906 26 L 33.439453 33.439453 A 1.50015 1.50015 0 1 0 35.560547 35.560547 L 45.560547 25.560547 A 1.50015 1.50015 0 0 0 45.560547 23.439453 L 35.560547 13.439453 A 1.50015 1.50015 0 0 0 34.484375 12.984375 A 1.50015 1.50015 0 0 0 33.439453 15.560547 L 40.878906 23 L 7.1210938 23 L 14.560547 15.560547 A 1.50015 1.50015 0 0 0 13.486328 12.978516 z"></path>
                  </svg>
                  {openDropdownId === project.id && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
                      <button
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProject(project.id);
                        }}
                      >
                        <PencilIcon className="h-4 w-4 mr-2" />
                        Editar
                      </button>
                      <button
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteProject(project.id);
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
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
