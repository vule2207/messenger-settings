import { ReactNode, ChangeEvent, useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { typograhyClass } from '@/constants';

interface BaseFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  subTitle?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
  className?: string;
  Component?: any;
  componentProps?: any;
}

const BaseField = ({
  title,
  subTitle,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  required = false,
  className,
  Component,
  componentProps,
  ...props
}: BaseFieldProps) => {
  const [touched, setTouched] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className={cn('grid grid-cols-12 gap-4', className)}>
      {title && (
        <div className='flex flex-col gap-2 col-span-3 justify-center'>
          <Label htmlFor={name} className=''>
            {title} {required && <span className='text-red-500'>*</span>}
          </Label>
          {subTitle && <span className={typograhyClass.secondaryText}>{subTitle}</span>}
        </div>
      )}

      <div className='col-span-9'>
        {Component ? (
          <>
            <Component {...componentProps} />
          </>
        ) : (
          <Input
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            type={type}
            aria-invalid={touched && !!error}
            aria-required={required}
            {...props}
          />
        )}
      </div>

      {touched && error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export default BaseField;
