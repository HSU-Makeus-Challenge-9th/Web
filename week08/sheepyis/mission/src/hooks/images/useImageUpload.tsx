import { useState, useRef } from "react";
import LP from "../../assets/images/lp.png";
import { useUploadMutation } from "./useUploadMutation";

export const useImageUpload = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync: uploadImage } = useUploadMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const uploadAndGetUrl = async (): Promise<string> => {
    if (!file) return LP;
    const imageUrl = await uploadImage(file);
    return imageUrl;
  };

  return {
    preview,
    fileInputRef,
    handleFileChange,
    handleImageClick,
    uploadAndGetUrl,
  };
};
