import React, { useState } from 'react';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  register,
  errors,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="input-container">
        <input
          type={inputType}
          id={name}
          {...register(name)}
          placeholder={placeholder}
          className={errors[name] ? 'error' : ''}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault();
            }
          }}
        />
        {type === 'password' && (
          <button 
            type="button" 
            className="toggle-password" 
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '👀' : '🙈'}
          </button>
        )}
      </div>
      {errors[name] && (
        <span className="error-message">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}; 
