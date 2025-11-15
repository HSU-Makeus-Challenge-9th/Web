import * as S from "./styles/DeleteModalStyle";

interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({ onClose, onConfirm }: DeleteModalProps) => {
  return (
    <div className={S.DeleteModalOverlay}>
      <div className={S.DeleteModalContainer}>
        <p className={S.DeleteModalP}>정말 탈퇴하시겠습니까?</p>

        <div className={S.ButtonContainer}>
          <button onClick={onClose} className={S.CancelButton}>
            취소
          </button>
          <button onClick={onConfirm} className={S.ConfirmButton}>
            탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
