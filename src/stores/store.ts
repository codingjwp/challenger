import {StateCreator, create} from 'zustand';

type ModalTypes = {
  types: 'error' | 'warning' | 'success';
  open: boolean;
  title: string;
  message: string;
};

export type GlobalModalSliceTypes = {
  data: ModalTypes;
  addErrorModal: (title: string, message: string) => void;
  addWarningModal: (title: string, message: string) => void;
  addSuccessModal: (title: string, message: string) => void;
  closeModal: () => void;
};

const initialState: ModalTypes = {
  types: 'success',
  open: false,
  title: '',
  message: '',
};

export const createGlobalModalSlice: StateCreator<
  GlobalModalSliceTypes,
  [],
  [],
  GlobalModalSliceTypes
> = (set) => ({
  data: initialState,
  addErrorModal: (title: string, message: string) =>
    set({data: {types: 'error', open: true, title, message}}),
  addWarningModal: (title: string, message: string) =>
    set({data: {types: 'warning', open: true, title, message}}),
  addSuccessModal: (title: string, message: string) =>
    set({data: {types: 'success', open: true, title, message}}),
  closeModal: () =>
    set(({data}) => ({data: {...data, open: false, title: '', message: ''}})),
});

export const useGlobalStore = create<GlobalModalSliceTypes>()((...props) => ({
  ...createGlobalModalSlice(...props),
}));
