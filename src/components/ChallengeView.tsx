import {useMutation} from '@tanstack/react-query';

import Button from '../components/Button';
import {LoadingSvg} from '../components/SvgItem';

import {
  featchDeleteChallenge,
  featchPutChallenge,
  queryClient,
} from '../util/http';

type ChallengeViewProps = {
  posts: {
    postId?: string;
    title: string;
    imgSrc: string;
    description: string;
    startDate: string;
    endDate: string;
  }[];
  tabIndex: string;
};

const ChallengeView = ({posts, tabIndex}: ChallengeViewProps) => {
  const {
    mutate,
    isPending: isDeleting,
    reset,
  } = useMutation({
    mutationFn: (postId: string) => featchDeleteChallenge(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['challenge', tabIndex]});
      reset();
    },
  });

  const {
    mutate: statusMutate,
    isPending: isStatusing,
    reset: statusReset,
  } = useMutation({
    mutationFn: ({postId, status}: {postId: string; status: string}) =>
      featchPutChallenge(postId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['challenge', tabIndex]});
      statusReset();
    },
  });

  const getDaysDifference = (start: string, end: string) => {
    const startDate = new Date(start).getTime();
    const endtDate = new Date(end).getTime();
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const timeDiff = endtDate - startDate;
    const diffValue = Math.floor(timeDiff / millisecondsPerDay);
    return diffValue > 999 ? '999+' : diffValue;
  };

  const handleDeletePost = (postId: string) => {
    mutate(postId);
  };
  const handleStatusChangePost = (postId: string, status: string) => {
    statusMutate({postId, status});
  };

  return (
    <section>
      {posts.map((post) => {
        return (
          <div
            className='flex flex-col w-full max-w-[90rem] mt-3 mx-auto bg-rose-200 rounded-lg border-[3px] border-rose-400 hover:border-indigo-400'
            key={post!.postId}
          >
            <div className='flex items-center p-5'>
              <img
                className='w-20 h-20 object-cover mr-3 rounded-lg'
                src={`http://localhost:8080${post.imgSrc}`}
                alt={post.description}
              />
              <div className='flex w-full gap-1 justify-between'>
                <h2 className='text-lg min-w-40 font-bold text-line-limit'>
                  {post.title}
                </h2>
                <p className='flex flex-col text-center min-w-[3.5rem] min-h-[3.5rem] gap-1 rounded bg-indigo-400 py-1 px-2 text-sm font-semibold '>
                  DAY
                  <span>{`${getDaysDifference(post.startDate, post.endDate)}`}</span>
                </p>
              </div>
            </div>
            <details className='px-5'>
              <summary>상세 설명</summary>
              {post.description}
            </details>
            <div className='flex justify-end gap-1 m-4'>
              <Button
                type='button'
                mode='fill'
                className='flex gap-1 bg-stone-700 hover:bg-stone-600 text-white'
                disabled={isDeleting || isStatusing}
                onClick={() => handleDeletePost(post.postId!)}
              >
                {isDeleting && <LoadingSvg isAnimation={isDeleting} />}
                삭제
              </Button>
              <Button
                type='button'
                mode='fill'
                className='bg-white hover:bg-slate-200'
                disabled={isDeleting || isStatusing}
                onClick={() => handleDeletePost(post.postId!)}
              >
                수정
              </Button>
              <Button
                type='button'
                mode='fill'
                className='flex gap-1 bg-red-400 hover:bg-red-500'
                disabled={isDeleting || isStatusing}
                onClick={() => handleStatusChangePost(post.postId!, 'failure')}
              >
                {isStatusing && <LoadingSvg isAnimation={isStatusing} />}
                실패
              </Button>
              <Button
                type='button'
                mode='fill'
                className='flex gap-1 bg-orange-400 hover:bg-orange-500'
                disabled={isDeleting || isStatusing}
                onClick={() => handleStatusChangePost(post.postId!, 'sucess')}
              >
                {isStatusing && <LoadingSvg isAnimation={isStatusing} />}
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
