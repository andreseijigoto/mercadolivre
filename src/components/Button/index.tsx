import React, { MouseEvent, ButtonHTMLAttributes } from 'react';
import './styles.css';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<IButtonProps> = (props, ...rest) => {

  return (
    <button className={`button ${props.className ? props.className : ''}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;