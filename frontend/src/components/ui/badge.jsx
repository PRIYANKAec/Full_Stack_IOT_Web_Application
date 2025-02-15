import React from 'react';
import { cn } from '@/lib/utils';

const Badge = ({ status }) => {
  const statusClasses = {
    connected: 'bg-green-500 text-white',
    disconnected: 'bg-red-500 text-white',
    failed: 'bg-yellow-500 text-white',
  };

  return (
    <span className={cn('px-2 py-1 rounded-2xl text-sm', statusClasses[status])}>
      {status}
    </span>
  );
};

export default Badge;