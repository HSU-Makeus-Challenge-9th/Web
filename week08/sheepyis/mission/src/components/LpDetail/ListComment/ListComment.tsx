import ItemComment from "../ItemComment/ItemComment";
import type { CommentItem } from "../../../types/lp/comment";
import * as S from "./styles/ListCommentStyle";

type Props = {
  data: CommentItem[];
  lpId: number;
};

const ListComment = ({ data, lpId }: Props) => {
  if (data.length === 0) {
    return <p className={S.ListCommentNotP}>아직 댓글이 없습니다.</p>;
  }

  return (
    <div className={S.ListCommentContainer}>
      {data.map((comment) => (
        <ItemComment key={comment.id} comment={comment} lpId={lpId} />
      ))}
    </div>
  );
};

export default ListComment;
