import {Link, useLocation} from 'react-router-dom';
import {LINK_PATH} from '../util/viewData';
import Button from './Button';

type HeaderProps = {
  title: string;
};

export default function Header({title}: HeaderProps) {
  const params = useLocation();
  const afterLogoStyle =
    'after:content-[""] after:top-0 after:-left-2 after:bg-blue-600 after:absolute after:w-3 after:h-3';
  return (
    <header className='fixed top-0 left-0 w-full h-12 px-4 flex justify-between items-center font-sans bg-rose-300'>
      <h1
        className={`relative text-lg uppercase font-bold tracking-widest ${afterLogoStyle}`}
      >
        {title}
      </h1>
      {params.pathname !== '/login' && (
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
            <Button mode='fill' className='h-full tracking-wider'>
              Logout
            </Button>
          </li>
        </ul>
      )}
    </header>
  );
}
