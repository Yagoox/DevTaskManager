import React, { useState, useRef, useEffect } from 'react';
import { Bars3Icon, UserCircleIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import AnimatedLogo from './AnimatedLogo'; 

interface HeaderProps {
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <AnimatedLogo />
          <button onClick={toggleMobileMenu} className="md:hidden text-gray-500 focus:outline-none">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">DevTaskManager</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <div className="relative" ref={dropdownRef}>
            <UserCircleIcon
              className="h-8 w-8 text-gray-600 hover:text-primary cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-20 ring-1 ring-black ring-opacity-5">
                {/* Informação do Usuário */}
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  {/* Linha separadora abaixo de "Signed in as" */}
                  <div className="border-t border-gray-200 my-2 mx-4"></div> {/* Linha com margem horizontal igual */}
                  <div className="flex items-center mt-2"> {/* Ajustado flex e items-center */}
                    <UserCircleIcon className="h-8 w-8 text-gray-500" />
                    <div className="ml-3">
                      <p className="text-sm font-bold text-gray-900">Yago Borba</p>
                      <p className="text-sm text-gray-500">Yago@example.com</p>
                    </div>
                  </div>
                </div>
                {/* Linha separadora abaixo das informações do usuário */}
                <div className="border-t border-gray-200 my-2 mx-4"></div> {/* Mesma margem horizontal */}
                {/* Opções do Dropdown */}
                <div className="py-1">
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <UserCircleIcon className="h-5 w-5 text-gray-400" />
                    Perfil
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Cog6ToothIcon className="h-5 w-5 text-gray-400" />
                    Configurações
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-400" />
                    Sair
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
