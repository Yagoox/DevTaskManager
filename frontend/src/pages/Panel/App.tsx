// frontend/src/pages/Panel/App.tsx

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import Sidebar from './components/Sidebar';
import ProjectModal from './components/ProjectModal';
import TaskModal from './components/TaskModal';
import Notification from './components/Notification';
import TaskTable from './components/TaskTable';
import axios from 'axios';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import { Project } from '../../types';
import '@/pages/styles/tailwind.css';


interface NotificationType {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

axios.defaults.baseURL = 'http://localhost:5146/api';


const App: React.FC = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  console.log('App Component Rendered');  

  useEffect(() => {
    axios.get('/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter projetos:', error);
        showNotification('Erro ao obter projetos.', 'error');
      });
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
  };

  const closeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Funções relacionadas a projetos
  const handleAddProject = () => {
    setEditingProjectId(null);
    setProjectModalOpen(true);
  };

  const handleSaveProject = (name: string) => {
    if (!name.trim()) {
      showNotification('Por favor, insira o nome do projeto.', 'error');
      return;
    }

    if (editingProjectId) {
      // atualizar projeto 
      axios.put(`/projects/${editingProjectId}`, { id: editingProjectId, name })
        .then(response => {
          setProjects(prev =>
            prev.map(project =>
              project.id === editingProjectId ? response.data : project
            )
          );
          showNotification('Projeto atualizado com sucesso!', 'success');
        })
        .catch(error => {
          console.error('Erro ao atualizar projeto:', error);
          showNotification('Erro ao atualizar projeto.', 'error');
        });
    } else {
      //criar novo projeto
      axios.post('/projects', { name })
        .then(response => {
          setProjects(prev => [...prev, response.data]);
          setSelectedProjectId(response.data.id);
          showNotification('Projeto criado com sucesso!', 'success');
        })
        .catch(error => {
          console.error('Erro ao criar projeto:', error);
          showNotification('Erro ao criar projeto.', 'error');
        });
    }

    setProjectModalOpen(false);
  };

  const handleEditProject = (id: number) => {
    setEditingProjectId(id);
    setProjectModalOpen(true);
  };

  const handleDeleteProject = (id: number) => {
    axios.delete(`/projects/${id}`)
      .then(() => {
        setProjects(prev => prev.filter(project => project.id !== id));
        if (selectedProjectId === id) {
          setSelectedProjectId(null);
        }
        showNotification('Projeto excluído.', 'info');
      })
      .catch(error => {
        console.error('Erro ao excluir projeto:', error);
        showNotification('Erro ao excluir projeto.', 'error');
      });
  };

  const handleSelectProject = (id: number) => {
    setSelectedProjectId(id);
  };

  // Funções relacionadas a tarefas
  const handleAddTask = () => {
    setEditingTaskId(null);
    setTaskModalOpen(true);
  };

  const handleSaveTask = ({ name, status }: { name: string; status: string }) => {
    if (!name.trim()) {
      showNotification('Por favor, insira o nome da tarefa.', 'error');
      return;
    }

    if (selectedProjectId === null) {
      showNotification('Nenhum projeto selecionado.', 'error');
      return;
    }

    if (editingTaskId) {
      // Atualizar tarefa existente
      axios.put(`/projects/${selectedProjectId}/tasks/${editingTaskId}`, { id: editingTaskId, name, status })
        .then(response => {
          setProjects(prev =>
            prev.map(project => {
              if (project.id === selectedProjectId) {
                const updatedTasks = project.tasks.map(task =>
                  task.id === editingTaskId ? response.data : task
                );
                return { ...project, tasks: updatedTasks };
              }
              return project;
            })
          );
          showNotification('Tarefa atualizada com sucesso!', 'success');
        })
        .catch(error => {
          console.error('Erro ao atualizar tarefa:', error);
          showNotification('Erro ao atualizar tarefa.', 'error');
        });
    } else {
      // Criar nova tarefa
      axios.post(`/projects/${selectedProjectId}/tasks`, { name, status })
        .then(response => {
          setProjects(prev =>
            prev.map(project => {
              if (project.id === selectedProjectId) {
                return { ...project, tasks: [...project.tasks, response.data] };
              }
              return project;
            })
          );
          showNotification('Tarefa criada com sucesso!', 'success');
        })
        .catch(error => {
          console.error('Erro ao criar tarefa:', error);
          showNotification('Erro ao criar tarefa.', 'error');
        });
    }

    setTaskModalOpen(false);
  };

  const handleEditTask = (id: number) => {
    setEditingTaskId(id);
    setTaskModalOpen(true);
  };

  const handleDeleteTask = (id: number) => {
    if (selectedProjectId === null) {
      showNotification('Nenhum projeto selecionado.', 'error');
      return;
    }

    axios.delete(`/projects/${selectedProjectId}/tasks/${id}`)
      .then(() => {
        setProjects(prev =>
          prev.map(project => {
            if (project.id === selectedProjectId) {
              return { ...project, tasks: project.tasks.filter(task => task.id !== id) };
            }
            return project;
          })
        );
        showNotification('Tarefa excluída.', 'info');
      })
      .catch(error => {
        console.error('Erro ao excluir tarefa:', error);
        showNotification('Erro ao excluir tarefa.', 'error');
      });
  };

  const selectedProject = projects.find((project) => project.id === selectedProjectId);

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
              <TaskTable
                tasks={selectedProject.tasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
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
            ? selectedProject?.tasks.find((t) => t.id === editingTaskId)
            : undefined
        }
      />

      {/* Notificações */}
      <div className="fixed top-4 right-4 z-50">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => closeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
