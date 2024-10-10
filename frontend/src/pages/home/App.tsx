import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskTable from './components/TaskTable';
import ProjectModal from './components/ProjectModal';
import TaskModal from './components/TaskModal';
import Notification from './components/Notification';
import { NotificationType } from '../../types';
import '@/pages/styles/tailwind.css';
import MobileMenu from './components/MobileMenu';
import useProjects from '../hooks/useProjects';
import useTasks from '../hooks/useTasks';

const App: React.FC = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const showNotification = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'info') => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setNotifications((prev) => prev.filter((n) => n.id !== id)), 3000);
    },
    []
  );

  const closeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const {
    projects,
    selectedProjectId,
    projectModalOpen,
    setProjectModalOpen,
    editingProjectId,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    handleSaveProject,
    handleSelectProject,
    setProjects,
  } = useProjects({ showNotification });

  const {
    taskModalOpen,
    editingTaskId,
    setTaskModalOpen,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleSaveTask,
  } = useTasks({
    selectedProjectId,
    projects,
    setProjects,
    showNotification,
  });

  const toggleMobileMenu = () => {
    setMobileMenuVisible((prev) => !prev);
  };

  const selectedProject = Array.isArray(projects)
    ? projects.find((project) => project.id === selectedProjectId)
    : null;

  return (
    <div className="flex flex-col h-screen bg-fixed-bg overflow-hidden">
      <div className="relative z-10 flex flex-col h-full">
        <Header toggleMobileMenu={toggleMobileMenu} />
        <MobileMenu isVisible={mobileMenuVisible} />
        <main className="flex-1 grid grid-cols-[250px_1fr] gap-6 p-6">
          <Sidebar
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={handleSelectProject}
            onAddProject={handleAddProject}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
          />
          <div className="bg-surface rounded-lg shadow-lg p-4 flex flex-col py-6">
            {/* Header da Tabela de Tarefas com Linha Separadora */}
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-textPrimary">Tarefas</h2>
              <button
                onClick={handleAddTask}
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
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>
            </div>
            <TaskTable
              tasks={selectedProject?.tasks || []}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </main>

        <ProjectModal
          isOpen={projectModalOpen}
          onClose={() => setProjectModalOpen(false)}
          onSave={handleSaveProject}
          initialName={
            editingProjectId ? projects.find((p) => p.id === editingProjectId)?.name : undefined
          }
        />
        <TaskModal
          isOpen={taskModalOpen}
          onClose={() => setTaskModalOpen(false)}
          onSave={handleSaveTask}
          initialTask={
            editingTaskId
              ? Array.isArray(selectedProject?.tasks)
                ? selectedProject.tasks.find((t) => t.id === editingTaskId)
                : undefined
              : undefined
          }
        />

        <div className="fixed top-4 right-4 z-50">
          {notifications.map((n) => (
            <Notification
              key={n.id}
              message={n.message}
              type={n.type}
              onClose={() => closeNotification(n.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
