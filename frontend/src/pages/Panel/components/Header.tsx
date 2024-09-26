// src/pages/Panel/components/Header.tsx
import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button onClick={toggleMobileMenu} className="md:hidden text-gray-500 focus:outline-none">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">DevTaskManager</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-primary">Projetos</a>
          <a href="#" className="text-gray-600 hover:text-primary">Tarefas</a>
          <a href="#" className="text-gray-600 hover:text-primary">Calendário</a>
          <a href="#" className="text-gray-600 hover:text-primary">Relatórios</a>
          <UserCircleIcon className="h-8 w-8 text-gray-600 hover:text-primary cursor-pointer" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
