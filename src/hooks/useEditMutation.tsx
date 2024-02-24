import {useMutation} from '@tanstack/react-query';
import {queryClient} from '@util/http';
import {MessageType} from 'GlobalCommonTypes';

type EditBodyTypes = {
  userId?: string;
  postId?: string;
  title: string;
  imgSrc: string;
  description: string;
  startDate: string;
  endDate: string;
};

type EditPostTypes = {
  path: string;
  body: EditBodyTypes;
};

type EditMutationTypes = {
  editFn: ({path, body}: EditPostTypes) => Promise<MessageType>;
  modalAction: () => void;
};

export const useEditMutation = ({editFn, modalAction}: EditMutationTypes) => {
  const {
    mutate,
    reset,
    isPending: isEditPending,
    isError: isEditError,
    error: editError,
  } = useMutation({
    mutationFn: editFn,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['views', 'challenge']});
      reset();
      modalAction();
    },
  });
  return {mutate, isEditPending, isEditError, editError};
};
