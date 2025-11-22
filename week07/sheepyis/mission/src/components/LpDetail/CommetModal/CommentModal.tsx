import * as S from "./styles/CommentModalStyle";

interface CommentModalProps {
  onEdit: () => void;
  onDelete: () => void;
}

const CommentModal = ({ onEdit, onDelete }: CommentModalProps) => {
  return (
    <div className={S.ModalContainer}>
      <button onClick={onEdit} className={S.ButtonContainer}>
        수정
      </button>
      <button onClick={onDelete} className={S.ButtonContainer}>
        삭제
      </button>
    </div>
  );
};

export default CommentModal;
