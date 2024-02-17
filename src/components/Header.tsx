import {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

import {LINK_PATH} from '../util/viewData';
import {removeWebStorage} from '../util/login';

import Button from './Button';
import Modal from './Modal';

type HeaderProps = {
  title: string;
};

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

const Header = ({title}: HeaderProps) => {
  const params = useLocation();
  const [open, setOpen] = useState(false);
  const isSign = params.pathname !== '/signup' && params.pathname !== '/signin';
  const afterLogoStyle =
    'after:content-[""] after:top-0 after:-left-2 after:bg-blue-600 after:absolute after:w-3 after:h-3';

  const handleClickModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header className='fixed top-0 left-0 w-full h-12 px-4 flex justify-between items-center font-sans bg-rose-300'>
      <Link to='/'>
        <h1
          className={`relative text-lg uppercase font-bold tracking-widest ${afterLogoStyle}`}
        >
          {title}
        </h1>
      </Link>
      {isSign && (
        <ul className='flex items-center gap-1'>
          {LINK_PATH.map((item) => {
            return (
              <li key={item.path} className='h-12'>
                <Link
                  role='button'
                  className='h-full flex items-center hover:underline hover:decoration-red-600 px-2 rounded tracking-wider'
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className='h-12'>
            <Button
              mode='fill'
              className='h-full tracking-wider bg-indigo-400 hover:bg-indigo-500'
              onClick={handleClickModal}
            >
              로그아웃
            </Button>
          </li>
        </ul>
      )}
      {open && <CloseModal onModalClose={handleClickModal} />}
    </header>
  );
};

export default Header;
