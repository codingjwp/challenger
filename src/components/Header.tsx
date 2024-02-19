import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import CloseModal from './modals/CloseModal';
import Button from './Button';

import {LINK_PATH} from '../util/viewData';

type HeaderProps = {
  title: string;
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
                  className='h-full flex items-center hover:underline hover:underline-offset-2 hover:text-red-600 hover:decoration-red-600 px-2 rounded tracking-wider'
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
              className='h-full tracking-wider '
              onClick={handleClickModal}
            >
              <span className='p-1 rounded-lg bg-indigo-400 hover:bg-indigo-500'>
                로그아웃
              </span>
            </Button>
          </li>
        </ul>
      )}
      {open && <CloseModal onModalClose={handleClickModal} />}
    </header>
  );
};

export default Header;
