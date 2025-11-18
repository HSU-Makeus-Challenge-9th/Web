import type { CommentItem } from "../../../types/lp/comment";
import * as S from "./styles/ItemCommentStyle";

type Props = {
  comment: CommentItem;
};

const ItemComment = ({ comment }: Props) => {
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
        <p className={S.ItemCommentNameP}>{comment.author.name}</p>
        <p className={S.ItemCommentContentP}>{comment.content}</p>
      </div>
    </div>
  );
};

export default ItemComment;
