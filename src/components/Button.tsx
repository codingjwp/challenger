import {ButtonHTMLAttributes, FC} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  mode: 'text' | 'fill' | 'tab';
};

const Button: FC<ButtonProps> = ({className, children, mode, ...props}) => {
  let btnStyle = 'p-2' + (className ? ' ' + className : '');
  if (mode === 'fill') {
    btnStyle += ' rounded bg-red-500 hover:bg-red-600';
  } else if (mode === 'text') {
    btnStyle += ' rounded hover:decoration-red-600';
  } else {
    btnStyle +=
      ' flex justify-center items-center w-full gap-2 tracking-widest bg-red-100';
  }

  return (
    <button className={btnStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;
