import { useState } from "react";
import * as S from "./styles/AddModalStyle";
import LP from "../../../../assets/images/lp.png";
import AddInput from "../../Input/AddInput/AddInput";
import ListTag from "./ListTag";
import { useAddMutation } from "../../../../hooks/lps/useAddMutation";
import { useImageUpload } from "../../../../hooks/images/useImageUpload";

interface AddModalProps {
  onClose: () => void;
}

const AddModal = ({ onClose }: AddModalProps) => {
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const {
    preview,
    fileInputRef,
    handleFileChange,
    handleImageClick,
    uploadAndGetUrl,
  } = useImageUpload();
  const { mutate: addLp, isPending } = useAddMutation(onClose);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() === "") return;
    setTags((prev) => [...prev, tagInput.trim()]);
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    if (!lpName.trim() || !lpContent.trim()) return;

    const thumbnailUrl = await uploadAndGetUrl();

    addLp({
      title: lpName,
      content: lpContent,
      thumbnail: thumbnailUrl,
      tags,
      published: true,
    });
  };

  const isAddTagDisabled = tagInput.trim() === "";
  const isAddLPDisabled =
    lpName.trim() === "" || lpContent.trim() === "" || tags.length === 0;

  return (
    <div className={S.AddModalOverlay} onClick={handleOverlayClick}>
      <div className={S.AddModalContainer}>
        <button className={S.CloseButton} onClick={onClose}>
          ✕
        </button>

        <div className={S.LPImg} onClick={handleImageClick}>
          <img src={preview || LP} alt="lp" />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <AddInput
          placeholder="LP Name"
          value={lpName}
          onChange={(e) => setLpName(e.target.value)}
        />
        <AddInput
          placeholder="LP Content"
          value={lpContent}
          onChange={(e) => setLpContent(e.target.value)}
        />

        <div className={S.TagInputDiv}>
          <AddInput
            placeholder="LP Tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          />

          <button
            className={`${S.TagButton} ${
              isAddTagDisabled
                ? "opacity-50 cursor-not-allowed"
                : "bg-pink-600 cursor-pointer"
            }`}
            onClick={handleAddTag}
            disabled={isAddTagDisabled}
          >
            Add
          </button>
        </div>

        <ListTag tags={tags} onRemoveTag={handleRemoveTag} />
        <button
          className={`${S.AddButton} ${
            isAddLPDisabled
              ? "opacity-50 cursor-not-allowed"
              : "bg-pink-600 cursor-pointer"
          }`}
          disabled={isAddLPDisabled || isPending}
          onClick={handleSubmit}
        >
          {isPending ? "Uploading..." : "Add LP"}
        </button>
      </div>
    </div>
  );
};

export default AddModal;
