// src/pages/Panel/components/AnimatedLogo.tsx
import React from 'react';
import '../../styles/AnimatedLogo.css'; 

const AnimatedLogo: React.FC = () => {
  return (
    <div className="loader">
      <div className="loader-square"></div>
      <div className="loader-square"></div>
      <div className="loader-square"></div>
      <div className="loader-square"></div>
      <div className="loader-square"></div>
      <div className="loader-square"></div>
      <div className="loader-square"></div>
      <div className="loader-square"></div>
    </div>
  );
};

export default AnimatedLogo;
