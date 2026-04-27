import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-blue-700',
    secondary: 'bg-secondary text-white hover:bg-slate-800',
    outline: 'border border-border bg-transparent hover:bg-accent text-slate-900',
    ghost: 'bg-transparent hover:bg-accent text-slate-600',
  };

  return (
    <button 
      className={`px-6 py-2.5 rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-black uppercase text-muted-foreground mb-2 tracking-wider">{label}</label>}
      <input 
        className={`w-full px-4 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1 font-medium italic">{error}</p>}
    </div>
  );
};

export const Card = ({ children, className = '', hover = true }) => {
  return (
    <div className={`bg-white border border-border rounded-xl overflow-hidden ${hover ? 'hover:shadow-lg transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-accent text-slate-900',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-green-100 text-green-700',
  };

  return (
    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${variants[variant]}`}>
      {children}
    </span>
  );
};
