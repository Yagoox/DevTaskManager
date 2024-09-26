// frontend/src/pages/Panel/components/TaskModal.tsx

import React, { useState, useEffect } from 'react';
import { Task } from '../../../types'; 

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { name: string; status: string }) => void;
  initialTask?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, initialTask }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('A Fazer');

  useEffect(() => {
    if (initialTask) {
      setName(initialTask.name);
      setStatus(initialTask.status);
    } else {
      setName('');
      setStatus('A Fazer');
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, status });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-xl font-semibold mb-4">
          {initialTask ? 'Editar Tarefa' : 'Nova Tarefa'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="A Fazer">A Fazer</option>
              <option value="Em Progresso">Em Progresso</option>
              <option value="Concluída">Concluída</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
