import type { CommentItem } from "../../../types/lp/comment";
import * as S from "./styles/ItemCommentStyle";
import CommentModal from "../CommetModal/CommentModal";
import { useState } from "react";
import { useEditCommentMutation } from "../../../hooks/lps/comment/useEditCommentMutation";
import { useDeleteCommentMutation } from "../../../hooks/lps/comment/useDeleteCommentMutation";

type Props = {
  comment: CommentItem;
  lpId: number;
};

const ItemComment = ({ comment, lpId }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const { mutate: editComment } = useEditCommentMutation();
  const { mutate: deleteComment } = useDeleteCommentMutation();

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      setIsMenuOpen(false);
    } else {
      if (!editContent.trim()) return;
      editComment({ lpId, commentId: comment.id, content: editContent });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (confirm("댓글을 삭제하시겠습니까?")) {
      deleteComment({ lpId, commentId: comment.id });
      setIsMenuOpen(false);
    }
  };

  const isEditDisabled = editContent.trim() === "";

  return (
    <div className={S.ItemCommentContainer}>
      {comment.author.avatar ? (
        <img
          src={comment.author.avatar}
          alt="author"
          className={S.ItemCommentProfileImg}
        />
      ) : (
        <div className={S.ItemCommentNotProfileImg} />
      )}
      <div className={S.ItemCommentExplainContainer}>
        <div className={S.ItemCommentModalContainer}>
          <p className={S.ItemCommentNameP}>{comment.author.name}</p>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="text-gray-400 hover:text-white"
          >
            ⋯
          </button>

          {isMenuOpen && (
            <CommentModal onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>

        {isEditing ? (
          <div className={S.EditContainer}>
            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className={S.ItemCommentInput}
            />
            <button
              onClick={handleEdit}
              disabled={isEditDisabled}
              className={`${S.ItemCommentButton} ${
                isEditDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-pink-600 cursor-pointer"
              }`}
            >
              완료
            </button>
          </div>
        ) : (
          <p className={S.ItemCommentContentP}>{comment.content}</p>
        )}
      </div>
    </div>
  );
};

export default ItemComment;
