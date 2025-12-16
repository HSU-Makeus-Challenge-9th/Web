export interface ModalState {
  isOpen: boolean;
}

export interface ModalStore extends ModalState {
  openModal: () => void;
  closeModal: () => void;
}
