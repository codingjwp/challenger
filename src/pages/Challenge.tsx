import {useState} from 'react';
import {redirect} from 'react-router-dom';

import ChallengeModal from '../components/modals/ChallengeModal';
import ChallengeTabs from '../components/ChallengeTabs';
import ChallengeView from '../components/ChallengeView';
import ErrorContainer from '../components/ErrorContainer';

import {limitCheckLogin} from '../util/login';
import {useQuery} from '@tanstack/react-query';
import {fetchGetChallenge} from '../util/http';
import {LoadingSvg} from '../components/SvgItem';
import {PostViewTypes} from 'GlobalCommonTypes';

type EditModalProps = {
  type: string;
  open: boolean;
  editValue?: PostViewTypes;
};

const Challenge = () => {
  const [tabIndex, setTabIndex] = useState<string>('challenge');
  const [modalAction, setModalAction] = useState<EditModalProps>({
    type: 'create',
    open: false,
    editValue: undefined,
  });
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['views', tabIndex],
    queryFn: () => fetchGetChallenge(tabIndex),
    gcTime: 1000 * 60 * 60 * 24,
    retry: 3,
  });

  const handleTabsClick = (index: string) => {
    setTabIndex(index);
  };
  const handleModelAction = (type: string, editValue?: PostViewTypes) => {
    setModalAction((prev) => {
      if (prev.type === type) {
        return {...prev, open: !prev.open, editValue: editValue};
      } else {
        return {type: type, open: true, editValue: editValue};
      }
    });
  };
  return (
    <main className='pt-12 max-w-[80rem] mx-auto'>
      {modalAction.open && (
        <ChallengeModal
          type={modalAction.type}
          onModalAction={handleModelAction}
          editValue={modalAction.editValue}
        />
      )}
      <ChallengeTabs
        tabIndex={tabIndex}
        counter={{
          challengeLength: data?.challengeLength || 0,
          successLength: data?.successLength || 0,
          failureLength: data?.failureLength || 0,
        }}
        onSelect={handleTabsClick}
        onModalAction={handleModelAction}
      />
      {isLoading && (
        <p className='flex gap-1 justify-center mt-4 text-lg '>
          <LoadingSvg isAnimation={isLoading} />
          데이터를 가져오는 중입니다...
        </p>
      )}
      {isError && <ErrorContainer message={error.message} />}
      {data && (
        <ChallengeView
          posts={data.posts}
          tabIndex={tabIndex}
          onModalAction={handleModelAction}
        />
      )}
    </main>
  );
};

export default Challenge;

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
  const path = limitCheckLogin('challenge');
  if (path) return redirect(path);
  return path;
};
