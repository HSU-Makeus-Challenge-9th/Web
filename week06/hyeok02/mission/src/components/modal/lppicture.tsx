import React from 'react';

interface Props {
  thumbnailPreview: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const LpPicture: React.FC<Props> = ({
  thumbnailPreview,
  fileInputRef,
  onChange,
}) => (
  <div className="mb-3">
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      className="hidden"
      onChange={onChange}
    />
    {thumbnailPreview && (
      <img
        src={thumbnailPreview}
        alt="LP 썸네일"
        className="w-full h-32 object-cover rounded"
      />
    )}
  </div>
);

export default LpPicture;
