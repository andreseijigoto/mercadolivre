import React, {ChangeEvent, InputHTMLAttributes} from 'react';

import './style.css';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
  name: string;
  label?: string;
  value?: string|undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
}

const Input: React.FC<IInputProps> = ({label, name, value, onChange, ...rest}) => {

  return (
    <div className="input-block">
      <label htmlFor={name} className={`${!label ? 'hidden' : null}`}>{label}</label>
      <input id={name} {...rest} onChange={onChange} value={value} />
    </div>
  );
}

export default Input;