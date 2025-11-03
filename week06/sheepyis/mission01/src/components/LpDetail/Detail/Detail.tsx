import { useState } from "react";
import type { LpDetailItem } from "../../../types/lp/lp";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ListTag from "../ListTag/ListTag";
import * as S from "./styles/DetailStyle";

type Props = {
  data: LpDetailItem;
};

const Detail = ({ data }: Props) => {
  const formattedDate = data.createdAt.slice(0, 10);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(data.likes.length);

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className={S.DetailContainer}>
      <div className={S.DetailInnerContainer}>
        <div className={S.DetailTopContainer}>
          <div className={S.DetailTopLeftContainer}>
            <img
              src={data.author.avatar ?? ""}
              alt={data.author.name}
              className={S.DetailProfileImg}
            />
            <p className={S.DetailP}>{data.author.name}</p>
          </div>
          <p className={S.DetailP}>{formattedDate}</p>
        </div>

        <div className={S.DetailTitleContainer}>
          <p className={`${S.DetailP} !w-[80%]`}>{data.title}</p>
          <div className={S.DetailTitleRightContainer}>
            <button>
              <FiEdit2 className={S.DetailButtonContainer} />
            </button>
            <button>
              <FiTrash2 className={S.DetailButtonContainer} />
            </button>
          </div>
        </div>

        <div className={S.DetailCDContainer}>
          <img
            src={data.thumbnail}
            alt={data.title}
            className={S.DetailCDImg}
          />
          <div className={S.DetailCDInnerDiv} />
        </div>

        <div className={S.DetailExplainContainer}>
          <p className={S.DetailP}>{data.content}</p>
        </div>

        <div className={S.DetailExplainContainer}>
          <ListTag data={data.tags} />
        </div>

        <div className={S.DetailLikeContainer}>
          <button onClick={handleLikeToggle}>
            {isLiked ? (
              <AiFillHeart className="text-[1.5vw] text-pink-500" />
            ) : (
              <AiOutlineHeart className="text-[1.5vw] text-white hover:text-pink-400" />
            )}
          </button>
          <p className={`${S.DetailP} !text-white`}>{likeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
