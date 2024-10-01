// frontend/src/pages/Panel/App.tsx

import React, { useState, useEffect } from 'react';
import ProjectService from '../../services/ProjectService';
import TaskService from '../../services/TaskService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskTable from './components/TaskTable';
import ProjectModal from './components/ProjectModal';
import TaskModal from './components/TaskModal';
import Notification from './components/Notification';
import { Project, NotificationType } from '../../types';
import '@/pages/styles/tailwind.css';
import MobileMenu from './components/MobileMenu'; 

const App: React.FC = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await ProjectService.getAllProjects();
        console.log('Dados recebidos (projects):', allProjects);
        if (Array.isArray(allProjects)) {
          // Verificação de IDs únicos
          const uniqueIds = new Set<number>();
          const validProjects = allProjects.filter((project) => {
            if (project.id === undefined || project.id === null) {
              console.warn('Projeto sem ID:', project);
              return false;
            }
            if (uniqueIds.has(project.id)) {
              console.warn('ID duplicado de projeto encontrado:', project.id);
              return false;
            }
            uniqueIds.add(project.id);
            return true;
          });
          setProjects(validProjects);
        } else {
          console.error('A resposta da API não é um array:', allProjects);
          showNotification('A resposta da API não é um array.', 'error');
        }
      } catch (error) {
        console.error('Erro ao obter projetos:', error);
        showNotification('Erro ao obter projetos.', 'error');
      }
    };
    fetchProjects();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications((prev) => prev.filter(n => n.id !== id)), 3000);
  };

  const closeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Funções relacionadas a projetos
  const handleAddProject = () => {
    setEditingProjectId(null);
    setProjectModalOpen(true);
  };

  const handleSaveProject = async (name: string) => {
    try {
      if (editingProjectId) {
        await ProjectService.updateProject(editingProjectId, name);
        setProjects(prev => prev.map(project =>
          project.id === editingProjectId ? { ...project, name } : project
        ));
        showNotification('Projeto atualizado com sucesso!', 'success');
      } else {
        const newProject = await ProjectService.createProject(name);
        if (newProject.id === undefined || newProject.id === null) {
          console.error('Projeto criado sem ID:', newProject);
          showNotification('Erro ao criar projeto: ID inválido.', 'error');
          return;
        }
        setProjects(prev => [...prev, newProject]);
        setSelectedProjectId(newProject.id);
        showNotification('Projeto criado com sucesso!', 'success');
      }
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      showNotification('Erro ao salvar projeto.', 'error');
    } finally {
      setProjectModalOpen(false);
    }
  };

  const handleEditProject = (id: number) => {
    setEditingProjectId(id);
    setProjectModalOpen(true);
  };

  const handleDeleteProject = async (id: number) => {
    try {
      await ProjectService.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      if (selectedProjectId === id) {
        setSelectedProjectId(null);
      }
      showNotification('Projeto excluído.', 'info');
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      showNotification('Erro ao excluir projeto.', 'error');
    }
  };

  const handleSelectProject = (id: number) => {
    setSelectedProjectId(id);
  };

  // Funções relacionadas a tarefas
  const handleAddTask = () => {
    setEditingTaskId(null);
    setTaskModalOpen(true);
  };

  const handleSaveTask = async (task: { name: string; status: string }) => {
    if (selectedProjectId === null) {
      showNotification('Nenhum projeto selecionado.', 'error');
      return;
    }

    try {
      if (editingTaskId) {
        await TaskService.updateTask(selectedProjectId, editingTaskId, task.name, task.status);
        setProjects(prev =>
          prev.map(project => {
            if (project.id === selectedProjectId) {
              const updatedTasks = Array.isArray(project.tasks)
                ? project.tasks.map(t =>
                    t.id === editingTaskId ? { ...t, name: task.name, status: task.status } : t
                  )
                : [];
              return { ...project, tasks: updatedTasks };
            }
            return project;
          })
        );
        showNotification('Tarefa atualizada com sucesso!', 'success');
      } else {
        const newTask = await TaskService.createTask(selectedProjectId, task.name, task.status);
        console.log('Nova Tarefa:', newTask);
        if (newTask.id === undefined || newTask.id === null) {
          console.error('Tarefa criada sem ID:', newTask);
          showNotification('Erro ao criar tarefa: ID inválido.', 'error');
          return;
        }
        setProjects(prev =>
          prev.map(project => {
            if (project.id === selectedProjectId) {
              const updatedTasks = Array.isArray(project.tasks)
                ? [...project.tasks, newTask]
                : [newTask];
              return { ...project, tasks: updatedTasks };
            }
            return project;
          })
        );
        showNotification('Tarefa criada com sucesso!', 'success');
      }
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      showNotification('Erro ao salvar tarefa.', 'error');
    } finally {
      setTaskModalOpen(false);
    }
  };

  const handleEditTask = (id: number) => {
    setEditingTaskId(id);
    setTaskModalOpen(true);
  };

  const handleDeleteTask = async (id: number) => {
    if (selectedProjectId === null) {
      showNotification('Nenhum projeto selecionado.', 'error');
      return;
    }

    try {
      await TaskService.deleteTask(selectedProjectId, id);
      setProjects(prev =>
        prev.map(project => {
          if (project.id === selectedProjectId) {
            const updatedTasks = Array.isArray(project.tasks)
              ? project.tasks.filter(task => task.id !== id)
              : [];
            return { ...project, tasks: updatedTasks };
          }
          return project;
        })
      );
      showNotification('Tarefa excluída.', 'info');
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      showNotification('Erro ao excluir tarefa.', 'error');
    }
  };

  // Garantir que 'projects' é um array antes de usar 'find'
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
