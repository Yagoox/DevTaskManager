import React, { useState, useCallback } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import TaskTable from './components/TaskTable/TaskTable';
import ProjectModal from './components/Modals/ProjectModal';
import TaskModal from './components/Modals/TaskModal';
import Notification from './components/Notifications/Notification';
import { NotificationType } from '../../types';
import '@/pages/styles/tailwind.css';
import MobileMenu from './components/MobileMenu/MobileMenu';
import useProjects from '../hooks/useProjects';
import useTasks from '../hooks/useTasks';
import styles from '@/pages/styles/scroll.module.css';


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
      <div className="flex flex-col min-h-screen bg-fixed-bg">
        <Header toggleMobileMenu={toggleMobileMenu} />
        <MobileMenu isVisible={mobileMenuVisible} />
        <main className="flex-1 p-6">
          <div className="flex gap-6">
            {/* Sidebar */}
            <Sidebar
              projects={projects}
              selectedProjectId={selectedProjectId}
              onSelectProject={handleSelectProject}
              onAddProject={handleAddProject}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
            />
  
            {/* Seção de Tarefas */}
            <div className="flex-1 bg-surface rounded-lg shadow-lg p-4 flex flex-col">
              {/* Header da Tabela de Tarefas com Linha Separadora */}
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h2 className="text-lg font-bold text-textPrimary">Tarefas</h2>
                {selectedProject && (
                <button
                  onClick={handleAddTask}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                )}
              </div>
  
              {/* Conteúdo da Seção de Tarefas */}
              {selectedProject ? (
                <div className={`${styles.scrollArea} overflow-y-auto`} style={{ maxHeight: '60vh' }}>
                  <TaskTable
                    tasks={selectedProject.tasks || []}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center flex-1">
                  <p className="text-gray-500 text-lg">Selecione um projeto para visualizar as tarefas.</p>
                </div>
              )}
            </div>
          </div>
        </main>

      {/* Modais */}
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

      {/* Notificações */}
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
  );
};

export default App;
