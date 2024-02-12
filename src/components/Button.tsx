import {ButtonHTMLAttributes, FC} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  mode: 'text' | 'fill';
};

const Button: FC<ButtonProps> = ({className, children, mode, ...props}) => {
  let btnStyle = 'p-2 rounded' + (className ? ' ' + className : '');
  if (mode === 'fill') {
    btnStyle += ' bg-red-500 hover:bg-red-600';
  } else {
    btnStyle += ' hover:decoration-red-600';
  }

  return (
    <button className={btnStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;
