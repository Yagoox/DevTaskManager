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

        {/* Lista de Projetos */}
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
                {/* Nome do Projeto */}
                <span className="font-medium">{project.name}</span>

                {/* Ícones de Edição e Exclusão */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que o clique no botão dispare a seleção do projeto
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
      </div>
    </aside>
  );
};

export default Sidebar;
