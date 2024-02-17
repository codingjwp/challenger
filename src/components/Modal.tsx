import {ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {motion} from 'framer-motion';

type ModalProps = {
  title: string;
  // mode: 'base' | 'error' | 'sucees';
  className?: string;
  children?: ReactNode;
  onClose: () => void;
};

const Modal = ({title, className, children, onClose}: ModalProps) => {
  const modalStyles =
    'w-[30rem] max-w-[90%] top-[10%] p-6 rounded-md z-10' +
    (className ? ` ${className}` : '');
  return createPortal(
    <>
      <div
        className='fixed bg-black/10 top-0 left-0  w-full h-screen z-[9]'
        onClick={onClose}
      ></div>
      <motion.dialog
        className={modalStyles}
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: 30}}
        open
      >
        <h2 className='text-xl font-sans font-bold'>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById('modal')!,
  );
};

export default Modal;
