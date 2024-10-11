import React from 'react';
import { Project } from '../../../../types';
import ProjectItem from './ProjectItem';
import styles from '@/pages/styles/scroll.module.css';
import { PlusIcon } from '@heroicons/react/24/outline'; // Importe o ícone

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
            className="inline-flex items-center justify-center rounded-md text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition hover:bg-gray-200"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>
        <div className={`${styles.scrollArea} overflow-y-auto`} style={{ maxHeight: '50vh' }}>
          <ul className="space-y-3">
            {projects.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                isSelected={project.id === selectedProjectId}
                onSelect={onSelectProject}
                onEdit={onEditProject}
                onDelete={onDeleteProject}
              />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
