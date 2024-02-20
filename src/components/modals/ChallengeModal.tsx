import {FormEvent, useState} from 'react';
import {useQuery, useMutation} from '@tanstack/react-query';

import Modal from './Modal';
import Input from '../Input';
import Button from '../Button';
import Textarea from '../Textarea';
import {LoadingSvg} from '../SvgItem';

import {PostViewTypes} from 'GlobalCommonTypes';

import {
  featchChallengeImage,
  featchEditChallenge,
  queryClient,
} from '../../util/http';
import ChallengeImageGroups from '../ChallengeImageGroups';

type ChallengeModalProps = {
  type: string;
  editValue?: PostViewTypes;
  onModalAction: (type: string, editValue?: PostViewTypes) => void;
};

const ChallengeModal = ({
  type,
  editValue,
  onModalAction,
}: ChallengeModalProps) => {
  const baseStyle = 'rounded-md w-full p-2 mb-2';
  const [imgLink, setImgLink] = useState(editValue?.imgSrc || '');
  const {data, isPending, isError, error} = useQuery({
    queryKey: ['images'],
    queryFn: featchChallengeImage,
    gcTime: 1000 * 60 * 60 * 24,
    retry: 3,
  });
  const {
    mutate,
    reset,
    isPending: isEditPending,
    isError: isEditError,
    error: editError,
  } = useMutation({
    mutationFn: featchEditChallenge,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['views', 'challenge']});
      reset();
      onModalAction(type);
    },
  });

  const handleCallengeSubmit = (event: FormEvent) => {
    event.preventDefault();
    const path =
      type === 'create' ? '/challenge' : `/challenge/${editValue?.postId}`;
    const element = event.target as HTMLFormElement;
    const formData = new FormData(element);
    const {title, description, startDate, endDate} =
      Object.fromEntries(formData);
    const newData = {
      title: title as string,
      description: description as string,
      startDate: startDate as string,
      endDate: endDate as string,
      imgSrc: imgLink,
    };
    mutate({path, body: newData});
  };

  const handleImageSelect = (imgSrc: string) => {
    setImgLink(imgSrc);
  };
  const minDay = () => {
    const min = new Date();
    const year = min.getFullYear();
    const month = String(min.getMonth() + 1).padStart(2, '0');
    const day = min.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal
      title={`${type === 'create' ? 'Create Challenge' : 'Edit Challenge'}`}
      onClose={() => onModalAction(type)}
      className='bg-rose-100'
    >
      <h2 className='mt-2 mb-4'>
        {type === 'create'
          ? '도전할 내용을 작성해 주세요.'
          : '수정하실 내용이 있나요?'}
      </h2>
      <form id='challenge_modal' onSubmit={handleCallengeSubmit}>
        <Input
          className={`${baseStyle}`}
          type='text'
          id='title'
          content='제목'
          required
          defaultValue={editValue?.title}
        />
        <div className='flex flex-col gap-2 mt-2 mb-2'>
          <span className='font-bold tracking-widest'>도전일자 : </span>
          <div className='flex gap-4'>
            <Input
              className={`${baseStyle}`}
              type='date'
              id='startDate'
              content='시작일자'
              min={minDay()}
              required
              defaultValue={editValue?.startDate}
            />
            <Input
              className={`${baseStyle}`}
              type='date'
              id='endDate'
              min={minDay()}
              content='종료일자'
              required
              defaultValue={editValue?.endDate}
            />
          </div>
        </div>
        {isPending || isError ? (
          <p className={`mb-2 font-bold ${error && 'text-red-500'}`}>
            {error?.message || '이미지 로딩 중...'}
          </p>
        ) : (
          <ChallengeImageGroups
            list={data.list}
            imgLink={imgLink}
            onSelect={handleImageSelect}
          />
        )}
        <Textarea
          className={`${baseStyle}`}
          id='description'
          content='설명'
          required
          defaultValue={editValue?.description}
        />
        {isEditError && (
          <p className='text-sm text-red-600 mb-2 font-bold'>
            {editError.message || '챌린지 생성에서 문제가 발생하였습니다.'}
          </p>
        )}
        <div className='flex gap-2 justify-end'>
          <Button
            className='flex gap-1 bg-rose-400 hover:bg-rose-500'
            type='submit'
            mode='fill'
            disabled={isEditPending}
          >
            {isPending && <LoadingSvg isAnimation={isPending} />}
            {type === 'create' ? '생성' : '수정'}
          </Button>
          <Button
            className='bg-indigo-400 hover:bg-indigo-500'
            type='button'
            mode='fill'
            disabled={isEditPending}
            onClick={() => onModalAction(type)}
          >
            닫기
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChallengeModal;
