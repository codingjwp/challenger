import {InputHTMLAttributes, forwardRef} from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  content: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {id, content, ...props},
  ref,
) {
  return (
    <div className='relative'>
      <label className='sr-only' htmlFor={id}>
        {content}
      </label>
      <input ref={ref} id={id} placeholder={content} {...props} />
    </div>
  );
});

export default Input;
