
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-bg-secondary rounded-xl p-6 shadow-lg border border-border-color ${className}`}>
      {children}
    </div>
  );
};

export default Card;
