// frontend/src/services/ProjectService.ts

import axios from 'axios';
import { Project } from '../types';

// Cria uma instância do axios com a baseURL configurada
const api = axios.create({
  baseURL: 'http://127.0.0.1:5146'  // Defina aqui a base URL da sua API
});


class ProjectService {
  /**
   * Obtém todos os projetos da API.
   * @returns {Promise<Project[]>} - Retorna uma promessa que resolve para um array de projetos.
   */
  async getAllProjects(): Promise<Project[]> {
    try {
      const response = await api.get('/api/projects');
      console.log('URL usada na requisição:', response.config.url);
      console.log('Resposta da API (getAllProjects):', response.data);

      if (Array.isArray(response.data)) {
        return response.data;
      }

      throw new Error('Formato de resposta inesperado da API.');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro na chamada getAllProjects:', error.response?.data || error.message);
      } else {
        console.error('Erro na chamada getAllProjects:', error);
      }
      throw error;
    }
  }

  /**
   * Cria um novo projeto na API.
   * @param {string} name - Nome do projeto.
   * @returns {Promise<Project>} - Retorna uma promessa que resolve para o projeto criado.
   */
  async createProject(name: string): Promise<Project> {
    try {
      const response = await api.post('/api/projects', { name }); // Caminho relativo via proxy
      console.log('URL usada na requisição:', response.config.url);
      console.log('Projeto criado:', response.data);
      
      // Verifica se a resposta é um objeto de projeto direto
      if (response.data && typeof response.data === 'object') {
        return response.data as Project;
      }

      // Caso contrário, lança um erro indicando formato inesperado
      throw new Error('Formato de resposta inesperado da API ao criar projeto.');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro na chamada createProject:', error.response?.data || error.message);
      } else {
        console.error('Erro na chamada createProject:', error);
      }
      throw error;
    }
  }

  /**
   * Atualiza um projeto existente na API.
   * @param {number} id - ID do projeto.
   * @param {string} name - Novo nome do projeto.
   * @returns {Promise<void>}
   */
  async updateProject(id: number, name: string): Promise<void> {
    try {
      await api.put(`/api/projects/${id}`, { name }); // Caminho relativo via proxy
      console.log(`Projeto ${id} atualizado.`);
    } catch (error) {
      console.error('Erro na chamada updateProject:', error);
      throw error;
    }
  }

  /**
   * Deleta um projeto existente na API.
   * @param {number} id - ID do projeto.
   * @returns {Promise<void>}
   */
  async deleteProject(id: number): Promise<void> {
    try {
      await api.delete(`/api/projects/${id}`); // Caminho relativo via proxy
      console.log(`Projeto ${id} deletado.`);
    } catch (error) {
      console.error('Erro na chamada deleteProject:', error);
      throw error;
    }
  }
}

export default new ProjectService();
