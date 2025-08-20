
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className="w-full bg-bg-tertiary text-text-primary px-4 py-2 rounded-lg border border-border-color focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors"
    />
  );
};

export default Input;
