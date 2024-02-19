import {useNavigate} from 'react-router-dom';

import Modal from './Modal';
import Button from '../Button';
import {removeWebStorage} from '../../util/login';

type CloseModalProps = {
  onModalClose: () => void;
};

const CloseModal = ({onModalClose}: CloseModalProps) => {
  const navigate = useNavigate();
  const handelClickLogOut = () => {
    const path = removeWebStorage();
    onModalClose();
    navigate(path);
  };
  return (
    <Modal className='bg-rose-100' title='Logout' onClose={onModalClose}>
      <p className='my-2'>로그아웃 하시겠습니까?</p>
      <div className='flex gap-2 justify-end'>
        <Button
          className='bg-rose-400 hover:bg-rose-500'
          type='button'
          mode='fill'
          onClick={handelClickLogOut}
        >
          로그아웃
        </Button>
        <Button
          className='bg-indigo-400 hover:bg-indigo-500'
          type='button'
          mode='fill'
          onClick={onModalClose}
        >
          닫기
        </Button>
      </div>
    </Modal>
  );
};

export default CloseModal;
