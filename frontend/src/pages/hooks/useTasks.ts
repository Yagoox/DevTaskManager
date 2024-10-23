import { useState } from 'react';
import TaskService from '../../services/TaskService';
import { Project } from '../../types';

interface UseTasksProps {
  selectedProjectId: number | null;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

/**
 * Hook para gerenciar a lógica de tarefas, incluindo adição, edição e remoção de tarefas.
 */
const useTasks = ({ selectedProjectId, setProjects, showNotification }: UseTasksProps) => {
  const [taskModalOpen, setTaskModalOpen] = useState(false); // Controle do modal de tarefa
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null); // ID da tarefa em edição

  /**
   * Abre o modal para adicionar uma nova tarefa.
   */
  const handleAddTask = () => {
    setEditingTaskId(null);
    setTaskModalOpen(true);
  };

  /**
   * Abre o modal para editar uma tarefa existente.
   * @param id ID da tarefa a ser editada.
   */
  const handleEditTask = (id: number) => {
    setEditingTaskId(id);
    setTaskModalOpen(true);
  };

  /**
   * Exclui uma tarefa do projeto selecionado.
   * @param id ID da tarefa a ser excluída.
   */
  const handleDeleteTask = async (id: number) => {
    if (selectedProjectId === null) {
      showNotification('Nenhum projeto selecionado.', 'error');
      return;
    }

    try {
      await TaskService.deleteTask(selectedProjectId, id);
      setProjects((prev) =>
        prev.map((project) => {
          if (project.id === selectedProjectId) {
            const updatedTasks = Array.isArray(project.tasks)
              ? project.tasks.filter((task) => task.id !== id)
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

  /**
   * Salva uma nova tarefa ou atualiza uma tarefa existente.
   * @param task Objeto contendo o nome, status e descrição da tarefa.
   */
  const handleSaveTask = async (task: { name: string; status: string; description: string }) => {
    if (selectedProjectId === null) {
      showNotification('Nenhum projeto selecionado.', 'error');
      return;
    }

    try {
      if (editingTaskId) {
        await TaskService.updateTask(
          selectedProjectId,
          editingTaskId,
          task.name,
          task.status,
          task.description
        );
        setProjects((prev) =>
          prev.map((project) => {
            if (project.id === selectedProjectId) {
              const updatedTasks = Array.isArray(project.tasks)
                ? project.tasks.map((t) =>
                    t.id === editingTaskId
                      ? { ...t, name: task.name, status: task.status, description: task.description }
                      : t
                  )
                : [];
              return { ...project, tasks: updatedTasks };
            }
            return project;
          })
        );
        showNotification('Tarefa atualizada com sucesso!', 'success');
      } else {
        const newTask = await TaskService.createTask(
          selectedProjectId,
          task.name,
          task.status,
          task.description
        );
        console.log('Nova Tarefa:', newTask);
        if (newTask.id === undefined || newTask.id === null) {
          console.error('Tarefa criada sem ID:', newTask);
          showNotification('Erro ao criar tarefa: ID inválido.', 'error');
          return;
        }
        setProjects((prev) =>
          prev.map((project) => {
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

  return {
    taskModalOpen,
    setTaskModalOpen,
    editingTaskId,
    setEditingTaskId,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleSaveTask,
  };
};

export default useTasks;
