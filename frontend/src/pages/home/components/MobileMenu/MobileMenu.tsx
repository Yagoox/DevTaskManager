import React from 'react';

interface MobileMenuProps {
  isVisible: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <nav className="bg-white shadow-md md:hidden">
      <div className="px-6 py-4 space-y-2">
        <a href="#" className="block text-gray-600 hover:text-primary">Projetos</a>
        <a href="#" className="block text-gray-600 hover:text-primary">Tarefas</a>
        <a href="#" className="block text-gray-600 hover:text-primary">Calendário</a>
        <a href="#" className="block text-gray-600 hover:text-primary">Relatórios</a>
      </div>
    </nav>
  );
};

export default MobileMenu;
