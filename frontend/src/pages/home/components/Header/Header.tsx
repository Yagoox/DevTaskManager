import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import AnimatedLogo from '../Utils/AnimatedLogo';
import ProfileDropdown from './ProfileDropdown';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <AnimatedLogo />
          <button onClick={toggleMobileMenu} className="md:hidden text-gray-500 focus:outline-none">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800">Zenith</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <ProfileDropdown />
        </nav>
      </div>
    </header>
  );
};

export default Header;
