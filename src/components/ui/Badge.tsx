import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'sky';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    sky: 'bg-sky-50 text-sky-700 border border-sky-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'inactive' | 'completed' | 'cancelled' | 'confirmed' | 'replied' | 'closed';
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const statusConfig: Record<string, { variant: 'warning' | 'success' | 'error' | 'default' | 'info' | 'sky', label: string }> = {
    pending: { variant: 'warning', label: 'Pending' },
    approved: { variant: 'success', label: 'Approved' },
    rejected: { variant: 'error', label: 'Rejected' },
    active: { variant: 'success', label: 'Active' },
    inactive: { variant: 'default', label: 'Inactive' },
    completed: { variant: 'success', label: 'Completed' },
    cancelled: { variant: 'error', label: 'Cancelled' },
    confirmed: { variant: 'success', label: 'Confirmed' },
    replied: { variant: 'info', label: 'Replied' },
    closed: { variant: 'default', label: 'Closed' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size={size}>
      <span className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${
          status === 'pending' ? 'bg-amber-500' :
          status === 'approved' || status === 'active' || status === 'completed' ? 'bg-green-500' :
          status === 'rejected' || status === 'cancelled' ? 'bg-red-500' :
          'bg-slate-500'
        }`} />
        {config.label}
      </span>
    </Badge>
  );
};

export { Badge, StatusBadge };