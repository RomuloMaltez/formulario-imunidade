import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            ref={ref}
            className={`
              w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded
              focus:ring-2 focus:ring-blue-500
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          <label className="ml-3 text-sm text-gray-700">
            {label}
          </label>
        </div>
        
        {error && (
          <p className="mt-1 ml-8 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
