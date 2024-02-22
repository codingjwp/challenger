import {MessageType} from 'GlobalCommonTypes';
import {useRouteError} from 'react-router-dom';

const Notfound = () => {
  const error = useRouteError();
  const newError = error as MessageType | Error;
  return (
    <main className='flex flex-col w-full h-screen justify-center items-center bg-rose-200/30'>
      <h2 className='text-6xl p-4 mb-4 font-sans font-bold'>404 Not Found</h2>
      <p className='text-3xl font-sans'>
        {newError?.message || 'Failed The page was not found'}
      </p>
    </main>
  );
};

export default Notfound;
