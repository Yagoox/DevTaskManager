import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

interface TaskItem {
  id: number;
  name: string;
  status: string;
}

interface Project {
  id: number;
  name: string;
  tasks: TaskItem[];
}

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
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="px-6 py-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Projetos</h2>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                project.id === selectedProjectId
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100 text-gray-700'
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
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProject(project.id);
                  }}
                  className="text-red-500 hover:text-red-600 focus:outline-none"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={onAddProject}
          className="mt-6 w-full btn btn-primary"
        >
          + Novo Projeto
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
