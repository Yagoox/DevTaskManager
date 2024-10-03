// frontend/src/pages/Panel/components/Sidebar.tsx

import React from 'react';
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
  return (
    <aside className="w-64 bg-surface border-r border-gray-200 rounded-lg shadow-md">
      <div className="px-6 py-6">
        <h2 className="text-xl font-semibold text-textPrimary mb-6">Projetos</h2>
        {/* Substituir 'divide-y divide-gray-200' por 'space-y-3' */}
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
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditProject(project.id);
                    }}
                    className="text-gray-500 hover:text-primary focus:outline-none"
                    aria-label={`Editar projeto ${project.name}`}
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProject(project.id);
                    }}
                    className="text-error hover:text-red-600 focus:outline-none"
                    aria-label={`Excluir projeto ${project.name}`}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <button onClick={onAddProject} className="mt-6 w-full btn btn-primary">
          + Novo Projeto
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
