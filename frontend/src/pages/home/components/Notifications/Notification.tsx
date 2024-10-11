// src/pages/Panel/components/Notification.tsx
import React, { useEffect } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeStyles = {
    success: 'bg-green-50 text-green-700',
    error: 'bg-red-50 text-red-700',
    info: 'bg-blue-50 text-blue-700',
  };

  const icons = {
    success: <CheckCircleIcon className="h-5 w-5 mr-2" />,
    error: <ExclamationCircleIcon className="h-5 w-5 mr-2" />,
    info: <InformationCircleIcon className="h-5 w-5 mr-2" />,
  };

  return (
    <div className={`notification ${typeStyles[type]}`}>
      {icons[type]}
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="ml-4 text-gray-500 focus:outline-none">
        &times;
      </button>
    </div>
  );
};

export default Notification;
