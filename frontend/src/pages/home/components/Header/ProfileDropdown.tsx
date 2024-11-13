import React, { useState, useRef, useEffect } from 'react';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const ProfileDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <UserCircleIcon
        className="h-8 w-8 text-gray-600 hover:text-primary cursor-pointer"
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-20 ring-1 ring-black ring-opacity-5">
          {/* user*/}
          <div className="px-4 py-3">
            <p className="text-sm text-gray-500">Logado como</p>
            <div className="border-t border-gray-200 my-2 mx-4"></div>
            <div className="flex items-center mt-2">
              <UserCircleIcon className="h-8 w-8 text-gray-500" />
              <div className="ml-3">
                <p className="text-sm font-bold text-gray-900">Yago Borba</p>
                <p className="text-sm text-gray-500">Yago@example.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 my-2 mx-4"></div>
          {/* dropdown */}
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
  );
};

export default ProfileDropdown;
