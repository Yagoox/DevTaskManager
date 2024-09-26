// src/pages/Panel/components/ProjectModal.tsx
import React, { useState, useEffect } from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialName?: string;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSave, initialName }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(initialName || '');
  }, [initialName]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{initialName ? 'Editar Projeto' : 'Novo Projeto'}</h3>
        <input
          type="text"
          placeholder="Nome do Projeto"
          className="input mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="btn btn-secondary">
            Cancelar
          </button>
          <button
            onClick={() => onSave(name)}
            className="btn btn-primary"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
