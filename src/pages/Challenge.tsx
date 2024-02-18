import {useState} from 'react';
import {redirect} from 'react-router-dom';

import ChallengeModal from '../components/ChallengeModal';
import ChallengeTabs from '../components/ChallengeTabs';
import ChallengeView from '../components/ChallengeView';

import {limitCheckLogin} from '../util/login';
import {useQuery} from '@tanstack/react-query';
import {fetchGetChallenge} from '../util/http';

const Challenge = () => {
  const [tabIndex, setTabIndex] = useState<string>('challenge');
  const [modalAction, setModalAction] = useState({
    type: 'create',
    open: false,
  });
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['challenge', tabIndex],
    queryFn: () => fetchGetChallenge(tabIndex),
    gcTime: 1000 * 60 * 60 * 24,
    retry: 3,
  });
  const handleTabsClick = (index: string) => {
    setTabIndex(index);
  };
  const handleModelAction = (type: string) => {
    // const form = document.getElementById('challenge_modal') as HTMLFormElement;
    // form.reset();
    setModalAction((prev) => {
      if (prev.type === type) {
        return {...prev, open: !prev.open};
      } else {
        return {...prev, type: type, open: true};
      }
    });
  };

  return (
    <main className='pt-12'>
      {modalAction.open && (
        <ChallengeModal
          type={modalAction.type}
          onModalAction={handleModelAction}
        />
      )}
      <ChallengeTabs
        tabIndex={tabIndex}
        counter={{
          challengeLength: data?.challengeLength || 0,
          sucessLength: data?.sucessLength || 0,
          failureLength: data?.failureLength || 0,
        }}
        onSelect={handleTabsClick}
        onModalAction={handleModelAction}
      />
      {isLoading && (
        <p className='text-center'>데이터를 가져오는 중입니다...</p>
      )}
      {data && <ChallengeView posts={data.posts} tabIndex={tabIndex} />}
    </main>
  );
};

export default Challenge;

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
  const path = limitCheckLogin('challenge');
  console.log('chall : ', path);
  if (path) return redirect(path);
  return path;
};
