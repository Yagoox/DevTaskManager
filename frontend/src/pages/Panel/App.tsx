// frontend/src/pages/Panel/App.tsx

import React, { useState } from 'react';
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
  // Estado para controlar a visibilidade do menu mobile
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  // Estado para notificações
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  /**
   * Função para exibir notificações
   */
  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications((prev) => prev.filter(n => n.id !== id)), 3000);
  };

  /**
   * Função para fechar uma notificação específica
   */
  const closeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Utilizando o hook useProjects
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

  // Utilizando o hook useTasks
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

  /**
   * Função para alternar a visibilidade do menu mobile
   */
  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  // Encontrar o projeto selecionado (se houver)
  const selectedProject = Array.isArray(projects) ? projects.find((project) => project.id === selectedProjectId) : null;

  return (
    <div className="flex flex-col h-full bg-background font-sans">
      <Header toggleMobileMenu={toggleMobileMenu} />
      <MobileMenu isVisible={mobileMenuVisible} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={handleSelectProject}
          onAddProject={handleAddProject}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />
        <main className="flex-1 overflow-auto p-6">
          {selectedProject ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">{selectedProject.name}</h2>
                <button onClick={handleAddTask} className="btn btn-primary">
                  + Nova Tarefa
                </button>
              </div>
              {Array.isArray(selectedProject.tasks) && selectedProject.tasks.length > 0 ? (
                <TaskTable
                  tasks={selectedProject.tasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              ) : (
                <p className="text-gray-600">Nenhuma tarefa encontrada.</p>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600 text-lg">Selecione um projeto ou adicione um novo.</p>
            </div>
          )}
        </main>
      </div>

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
