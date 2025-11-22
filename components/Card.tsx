import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle }) => {
  return (
    <div className={`glass-panel rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6 text-center space-y-2">
          {title && <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">{title}</h2>}
          {subtitle && <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;