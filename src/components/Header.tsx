import {Link} from 'react-router-dom';

type HeaderProps = {
  title: string;
};

export default function Header({title}: HeaderProps) {
  const afterLogoStyle =
    'after:content-[""] after:top-0 after:-left-2 after:bg-blue-600 after:absolute after:w-3 after:h-3';
  return (
    <header className='w-full h-12 px-4 flex justify-between items-center font-sans bg-rose-500'>
      <h1
        className={`relative text-lg uppercase font-bold tracking-widest ${afterLogoStyle}`}
      >
        {title}
      </h1>
      <ul className='flex items-center'>
        <li className='h-12'>
          <Link
            role='button'
            className='h-full flex items-center hover:underline hover:bg-rose-600 px-2 rounded'
            to='dashboard'
          >
            DashBoard
          </Link>
        </li>
        <li className='h-12'>
          <button
            className='h-full hover:underline hover:bg-rose-600 px-2 rounded'
            type='button'
          >
            로그아웃
          </button>
        </li>
      </ul>
    </header>
  );
}
