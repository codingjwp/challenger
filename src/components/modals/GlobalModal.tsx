import Modal from '@modals/Modal';
import Button from '@ui/Button';

import {useGlobalStore} from '@stores/store';

const GlobalModal = () => {
  const {types, title, message} = useGlobalStore((state) => state.data);
  const closeModal = useGlobalStore((state) => state.closeModal);
  const modalStyle = types === 'error' ? 'bg-rose-100 z-[11]' : '';
  const btnStyle = types === 'error' ? 'bg-red-400 hover:bg-red-500' : '';
  return (
    <Modal className={modalStyle} title={title} onClose={closeModal}>
      <p className='my-2'>{message}</p>
      <div className='flex gap-2 justify-end'>
        <Button
          className={btnStyle}
          type='button'
          mode='fill'
          onClick={closeModal}
        >
          닫기
        </Button>
      </div>
    </Modal>
  );
};

export default GlobalModal;
