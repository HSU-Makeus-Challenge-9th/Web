import { useState } from "react";
import type { LpDetailItem } from "../../../types/lp/lp";
import { FiTrash2, FiEdit2, FiCheck } from "react-icons/fi";
import ListTag from "../ListTag/ListTag";
import * as S from "./styles/DetailStyle";
import Comment from "../Comment/Comment";
import { useEditMutation } from "../../../hooks/lps/useEditMutation";
import { useDeleteMutation } from "../../../hooks/lps/useDeleteMutation";
import { useNavigation } from "../../../hooks/useNavigation";
import { useImageUpload } from "../../../hooks/images/useImageUpload";
import Like from "../Like/Like";

type Props = {
  data: LpDetailItem;
};

const Detail = ({ data }: Props) => {
  const formattedDate = data.createdAt.slice(0, 10);
  const { handleMoveClick } = useNavigation();

  const { mutate: editLp } = useEditMutation();
  const { mutate: deleteLp } = useDeleteMutation();

  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [thumbnail, setThumbnail] = useState(data.thumbnail);
  const [tags, setTags] = useState<string[]>(data.tags.map((tag) => tag.name));
  const [newTag, setNewTag] = useState("");

  const {
    preview,
    fileInputRef,
    handleFileChange,
    handleImageClick,
    uploadAndGetUrl,
  } = useImageUpload();

  const handleDelete = () => {
    if (confirm("정말 게시글을 삭제하시겠습니까?")) {
      deleteLp(data.id, {
        onSuccess: () => {
          handleMoveClick("/"), window.location.reload();
        },
      });
    }
  };

  const handleEdit = () => setIsEditMode(true);

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    setTags([...tags, trimmed]);
    setNewTag("");
  };

  const handleSave = async () => {
    const uploadedUrl = await uploadAndGetUrl();

    editLp(
      {
        lpId: data.id,
        payload: {
          title,
          content,
          thumbnail: uploadedUrl || thumbnail,
          tags,
        },
      },
      {
        onSuccess: () => {
          setIsEditMode(false);
          window.location.reload();
        },
      }
    );
  };

  return (
    <div className={S.DetailOutContainer}>
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
            {isEditMode ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={S.DetailTitleInput}
              />
            ) : (
              <p className={`${S.DetailP} !w-[80%]`}>{title}</p>
            )}

            <div className={S.DetailTitleRightContainer}>
              {isEditMode ? (
                <button onClick={handleSave}>
                  <FiCheck className={S.DetailButtonContainer} />
                </button>
              ) : (
                <button onClick={handleEdit}>
                  <FiEdit2 className={S.DetailButtonContainer} />
                </button>
              )}
              <button onClick={handleDelete}>
                <FiTrash2 className={S.DetailButtonContainer} />
              </button>
            </div>
          </div>

          <div
            className={`${S.DetailCDContainer} cursor-pointer`}
            onClick={isEditMode ? handleImageClick : undefined}
          >
            {preview ? (
              <img
                src={preview ?? thumbnail}
                alt={title}
                className={S.DetailCDImg}
              />
            ) : (
              <img src={thumbnail} alt={title} className={S.DetailCDImg} />
            )}

            <div className={S.DetailCDInnerDiv} />
            {isEditMode && (
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            )}
          </div>

          <div className={S.DetailExplainContainer}>
            {isEditMode ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={S.DetailExplainTextArea}
              />
            ) : (
              <p className={S.DetailP}>{content}</p>
            )}
          </div>

          <div className={S.DetailTagContainer}>
            {isEditMode ? (
              <div className={S.DetailTagInnerContainer}>
                <div className={S.DetailTagAdd}>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                    placeholder="태그 입력"
                    className={S.DetailTitleInput}
                  />
                  <button onClick={handleAddTag} className={S.DetailTagButton}>
                    추가
                  </button>
                </div>

                <ListTag
                  data={tags.map((name, idx) => ({ id: idx, name }))}
                  isEditMode={true}
                  onRemove={(id) => setTags(tags.filter((_, i) => i !== id))}
                />
              </div>
            ) : (
              <ListTag data={data.tags} />
            )}
          </div>

          <Like
            lpId={data.id}
            initialCount={data.likes?.length ?? 0}
            likes={data.likes}
          />
        </div>
      </div>

      <Comment />
    </div>
  );
};

export default Detail;
