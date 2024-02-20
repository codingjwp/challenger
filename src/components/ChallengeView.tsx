import {useMutation} from '@tanstack/react-query';

import Button from '../components/Button';
import {PostViewTypes} from 'GlobalCommonTypes';

import {
  featchDeleteChallenge,
  featchPutChallenge,
  queryClient,
} from '../util/http';
import {useGlobalStore} from '../stores/store';

type ChallengeViewProps = {
  posts: PostViewTypes[];
  tabIndex: string;
  onModalAction: (type: string, editValue?: PostViewTypes) => void;
};

const ChallengeView = ({
  posts,
  tabIndex,
  onModalAction,
}: ChallengeViewProps) => {
  const addErrorModal = useGlobalStore((state) => state.addErrorModal);
  const {
    mutate,
    isPending: isDeleting,
    reset,
  } = useMutation({
    mutationFn: (postId: string) => featchDeleteChallenge(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['views', tabIndex]});
      reset();
    },
    onError: (error) => {
      addErrorModal('ERROR', error.message);
    },
  });

  const {
    mutate: statusMutate,
    isPending: isStatusing,
    reset: statusReset,
  } = useMutation({
    mutationFn: featchPutChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['views', tabIndex]});
      statusReset();
    },
    onError: (error) => {
      addErrorModal('ERROR', error.message);
    },
  });

  const getDaysDifference = (start: string, end: string) => {
    const startDate = new Date(start).getTime();
    const endtDate = new Date(end).getTime();
    const newData = new Date().getTime();
    if (newData >= endtDate) {
      return 'failed';
    }
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const timeDiff = endtDate - startDate;
    const diffValue = Math.floor(timeDiff / millisecondsPerDay);

    return diffValue > 999
      ? '999+'
      : diffValue < 0
        ? 'failed'
        : String(diffValue);
  };

  const handleDeletePost = (postId: string) => {
    mutate(postId);
  };
  const handleStatusChangePost = (postId: string, status: string) => {
    statusMutate({postId, status});
  };
  const diffValue = (type: string, post?: PostViewTypes) => {
    let diff;
    if (type === 'day')
      diff =
        tabIndex === 'challenge'
          ? getDaysDifference(post!.startDate!, post!.endDate!)
          : tabIndex === 'success'
            ? '성공'
            : '실패';
    else if (type === 'badgeStyle')
      diff =
        tabIndex === 'challenge'
          ? 'bg-indigo-400'
          : tabIndex === 'success'
            ? 'bg-teal-700 text-white'
            : 'bg-rose-700 text-white';
    return diff;
  };

  return (
    <section className='max-w-3xl mx-auto'>
      {posts.map((post) => {
        const diffDay = diffValue('day', post);
        const diffStyle = diffValue('badgeStyle');
        const isDisabled = isDeleting || isStatusing;
        return (
          <div
            className='flex flex-col w-full max-w-[90rem] mt-3 mx-auto bg-rose-200 rounded-lg border-[3px] border-rose-400 hover:border-indigo-400'
            key={post.postId!}
          >
            <div className='flex items-center p-5'>
              <img
                className='w-20 h-20 object-cover mr-3 rounded-lg'
                src={`http://localhost:8080${post.imgSrc!}`}
                alt={post.description!}
              />
              <div className='flex w-full gap-1 justify-between'>
                <h2 className='text-lg min-w-40 font-bold text-line-limit'>
                  {post.title}
                </h2>
                <p
                  className={`flex text-center min-w-[3.5rem] min-h-[3.5rem] gap-1 rounded  py-1 px-2 text-sm font-semibold 
                  ${tabIndex === 'challenge' && diffDay !== 'failed' ? 'flex-col' : 'justify-center items-center'} 
                  ${diffDay === 'failed' ? 'bg-rose-500' : `${diffStyle}`}`}
                >
                  {tabIndex === 'challenge' && diffDay !== 'failed' && 'DAY'}
                  <span>{diffDay === 'failed' ? '실패' : diffDay}</span>
                </p>
              </div>
            </div>
            <details className='px-5 w-full'>
              <summary>상세 설명</summary>
              <pre className='w-full mt-2 whitespace-pre-wrap'>
                {post.description!}
              </pre>
            </details>
            <div className='flex justify-end gap-1 m-4'>
              <Button
                type='button'
                mode='fill'
                className={`bg-stone-700 hover:bg-stone-600 text-white ${isDisabled && 'opacity-60 cursor-not-allowed'}`}
                disabled={isDisabled}
                onClick={() => handleDeletePost(post.postId!)}
              >
                삭제
              </Button>
              {tabIndex === 'challenge' && (
                <Button
                  type='button'
                  mode='fill'
                  className={`bg-white hover:bg-slate-200 ${(isDisabled || diffDay === 'failed') && 'opacity-60 cursor-not-allowed'}`}
                  disabled={isDisabled || diffDay === 'failed'}
                  onClick={() => {
                    onModalAction('update', post);
                  }}
                >
                  수정
                </Button>
              )}
              <Button
                type='button'
                mode='fill'
                className={`bg-red-400 hover:bg-red-500 ${isDisabled && 'opacity-60 cursor-not-allowed'}`}
                disabled={isDisabled}
                onClick={() => handleStatusChangePost(post.postId!, 'failure')}
              >
                실패
              </Button>
              <Button
                type='button'
                mode='fill'
                className={`bg-orange-400 hover:bg-orange-500 ${(isDisabled || diffDay === 'failed') && 'opacity-60 cursor-not-allowed'}`}
                disabled={isDisabled || diffDay === 'failed'}
                onClick={() => handleStatusChangePost(post.postId!, 'success')}
              >
                성공
              </Button>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ChallengeView;
