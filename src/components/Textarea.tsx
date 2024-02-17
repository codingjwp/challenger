import {TextareaHTMLAttributes, forwardRef} from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  content: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({id, content, ...props}, ref) {
    return (
      <div className='relative'>
        <label className='sr-only' htmlFor={id}>
          {content}
        </label>
        <textarea
          ref={ref}
          id={id}
          name={id}
          placeholder={content}
          {...props}
        />
      </div>
    );
  },
);

export default Textarea;
