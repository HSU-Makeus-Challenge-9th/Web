import { create } from "zustand";

interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

// 상태 정의
interface ModalState {
  // state
  isOpen: boolean;

  // actions
  actions: ModalActions;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,

  actions: {
    openModal: () =>
      set({
        isOpen: true,
      }),
    closeModal: () =>
      set({
        isOpen: false,
      }),
  },
}));

export const useModalActions = (): ModalActions =>
  useModalStore((state) => state.actions);
