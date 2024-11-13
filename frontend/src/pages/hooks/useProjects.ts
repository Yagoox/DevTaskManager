import { useState, useEffect } from 'react';
import ProjectService from '../../services/ProjectService';
import { Project } from '../../types';

interface UseProjectsProps {
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

/**
 * Hook para gerenciar a lógica de projetos, incluindo CRUD e seleção.
 */
const useProjects = ({ showNotification }: UseProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([]); // Lista de projetos
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null); // ID do projeto selecionado
  const [projectModalOpen, setProjectModalOpen] = useState(false); // Controle do modal de projeto
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null); // ID do projeto sendo editado

  /**
   * Busca todos os projetos da API ao montar o componente.
   */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await ProjectService.getAllProjects();
        console.log('Dados recebidos (projects):', allProjects);
        if (Array.isArray(allProjects)) {
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
  }, [showNotification]);

  /**
   * Abre o modal para adicionar um projeto.
   */
  const handleAddProject = () => {
    setEditingProjectId(null);
    setProjectModalOpen(true);
  };

  /**
   * Abre o modal para editar um projeto.
   * @param id ID do projeto a ser editado.
   */
  const handleEditProject = (id: number) => {
    setEditingProjectId(id);
    setProjectModalOpen(true);
  };

  /**
   * Exclui um projeto da lista e da API.
   * @param id ID do projeto a ser excluído.
   */
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

  /**
   * Salva um projeto novo ou atualizado.
   * @param name Nome do projeto.
   */
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

  /**
   * Seleciona um projeto pelo ID.
   * @param id ID do projeto a ser selecionado.
   */
  const handleSelectProject = (id: number) => {
    setSelectedProjectId(id);
  };

  return {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    projectModalOpen,
    setProjectModalOpen,
    editingProjectId,
    setEditingProjectId,
    handleAddProject,
    handleEditProject,
    handleDeleteProject,
    handleSaveProject,
    handleSelectProject,
    setProjects, // Exposto para que useTasks possa atualizar as tarefas
  };
};

export default useProjects;
