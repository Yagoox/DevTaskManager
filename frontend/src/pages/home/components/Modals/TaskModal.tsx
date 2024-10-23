import React, { useState, useEffect } from 'react';
import { Task } from '../../../../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { name: string; status: string; description: string }) => void;
  initialTask?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, initialTask }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'A Fazer' | 'Em Progresso' | 'Concluída'>('A Fazer');
  const [description, setDescription] = useState(''); // Novo estado para a descrição

  useEffect(() => {
    if (initialTask) {
      setName(initialTask.name);
      setStatus(initialTask.status as 'A Fazer' | 'Em Progresso' | 'Concluída');
      setDescription(initialTask.description); // Inicializa a descrição
    } else {
      setName('');
      setStatus('A Fazer');
      setDescription(''); // Limpa a descrição
    }
  }, [initialTask]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-xl font-bold text-textPrimary mb-4">
          {initialTask ? 'Editar Tarefa' : 'Nova Tarefa'}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({ name, status, description }); // Inclui a descrição
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-textPrimary mb-1">Nome</label>
            <input
              type="text"
              placeholder="Nome da Tarefa"
              className="input mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4"> {/* Novo campo para descrição */}
            <label className="block text-sm font-medium text-textPrimary mb-1">Descrição</label>
            <textarea
              placeholder="Descrição da Tarefa"
              className="input mb-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-textPrimary mb-1">Status</label>
            <select
              className="input"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as 'A Fazer' | 'Em Progresso' | 'Concluída')
              }
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
