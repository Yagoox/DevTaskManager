// frontend/src/services/TaskService.ts

import axios from 'axios';
import { Task } from '../types';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5146'  // Defina aqui a base URL da sua API
});

class TaskService {
  /**
   * Cria uma nova tarefa na API.
   * @param {number} projectId - ID do projeto.
   * @param {string} name - Nome da tarefa.
   * @param {string} status - Status da tarefa.
   * @returns {Promise<Task>} - Retorna uma promessa que resolve para a tarefa criada.
   */
  async createTask(projectId: number, name: string, status: string): Promise<Task> {
    try {
      const response = await api.post(`/api/projects/${projectId}/tasks`, {
        name,
        status,
      });
  
      console.log('Tarefa criada:', response.data);
  
      // Verifica se a resposta é um objeto de tarefa
      if (response.data && typeof response.data === 'object') {
        return response.data as Task;
      }
  
      // Caso contrário, lança um erro indicando formato inesperado
      throw new Error('Formato de resposta inesperado da API ao criar tarefa.');
    } catch (error: unknown) {
      console.error('Erro na chamada createTask:', error);
      throw error;
    }
  }

  /**
   * Atualiza uma tarefa existente na API.
   * @param {number} projectId - ID do projeto.
   * @param {number} taskId - ID da tarefa.
   * @param {string} name - Novo nome da tarefa.
   * @param {string} status - Novo status da tarefa.
   * @returns {Promise<void>}
   */
  async updateTask(projectId: number, taskId: number, name: string, status: string): Promise<void> {
    try {
      await api.put(`/api/projects/${projectId}/tasks/${taskId}`, { name, status }); // Caminho relativo via proxy
      console.log(`Tarefa ${taskId} atualizada no projeto ${projectId}.`);
    } catch (error) {
      console.error('Erro na chamada updateTask:', error);
      throw error;
    }
  }

  /**
   * Deleta uma tarefa existente na API.
   * @param {number} projectId - ID do projeto.
   * @param {number} taskId - ID da tarefa.
   * @returns {Promise<void>}
   */
  async deleteTask(projectId: number, taskId: number): Promise<void> {
    try {
      await api.delete(`/api/projects/${projectId}/tasks/${taskId}`); // Caminho relativo via proxy
      console.log(`Tarefa ${taskId} deletada do projeto ${projectId}.`);
    } catch (error) {
      console.error('Erro na chamada deleteTask:', error);
      throw error;
    }
  }

  /**
   * Obtém uma tarefa específica da API.
   * @param {number} projectId - ID do projeto.
   * @param {number} taskId - ID da tarefa.
   * @returns {Promise<Task>} - Retorna uma promessa que resolve para a tarefa encontrada.
   */
  async getTaskById(projectId: number, taskId: number): Promise<Task> {
    try {
      const response = await api.get(`/api/projects/${projectId}/tasks/${taskId}`);
      console.log('Tarefa obtida:', response.data);

      if (response.data && typeof response.data === 'object') {
        return response.data as Task;
      }

      throw new Error('Formato de resposta inesperado da API ao obter tarefa.');
    } catch (error) {
      console.error('Erro na chamada getTaskById:', error);
      throw error;
    }
  }
}

export default new TaskService();
