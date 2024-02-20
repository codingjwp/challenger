import {redirect} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';

import {limitCheckLogin} from '../util/login';
import {featchGetDashboard} from '../util/http';

import ChallengeImageGroups from '../components/ChallengeImageGroups';
import ErrorContainer from '../components/ErrorContainer';
import {LoadingSvg, DouqhuntSvg} from '../components/SvgItem';

const Dashboard = () => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['dashboard'],
    queryFn: featchGetDashboard,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 3,
  });
  return (
    <main className='pt-12 max-w-[80rem] mx-auto'>
      {isLoading && (
        <p className='flex gap-1 justify-center mt-4 text-lg '>
          <LoadingSvg isAnimation={isLoading} />
          데이터를 가져오는 중입니다...
        </p>
      )}
      {isError && <ErrorContainer message={error.message} />}
      {data && (
        <div className='px-4 w-full'>
          <h2 className='text-2xl font-bold font-serif  my-4'>
            {data.nick}님의 도전 기록
          </h2>
          <p className='font-serif'>여러분의 도전 여기에 담겨 있습니다.</p>
          <hr className='my-4 w-full h-[2px] bg-slate-400/50' />
          <section className='grid grid-cols-3 grid-rows-2 gap-[2px] text-center font-serif font-medium mb-6'>
            <p className='h-10 py-2 rounded bg-purple-500'>도전중인 목표</p>
            <p className='h-10 py-2 rounded bg-teal-400'>성공한 목표</p>
            <p className='h-10 py-2 rounded bg-rose-500'>실패한 목표</p>
            <p className='text-lg py-2 my-auto bg-black/10 align-middle'>
              {data.lengthList.userChallengeLength}
            </p>
            <p className='text-lg py-2 my-auto bg-black/10 align-middle'>
              {data.lengthList.userSuccessLength}
            </p>
            <p className='text-lg py-2 my-auto bg-black/10 align-middle'>
              {data.lengthList.userFailureLength}
            </p>
          </section>
          <section className='flex justify-center items-center mb-4'>
            <DouqhuntSvg
              radius={90}
              colors={['#a855f7', '#2dd4bf', '#f43f5e']}
              texts={['challenge', 'success', 'failure']}
              dataset={[
                data.lengthList.userChallengeLength,
                data.lengthList.userSuccessLength,
                data.lengthList.userFailureLength,
              ]}
            />
          </section>
          <ChallengeImageGroups list={data.typeList} />
        </div>
      )}
    </main>
  );
};

export default Dashboard;

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
  const path = limitCheckLogin('dashboard');
  if (path) return redirect(path);
  return path;
};
