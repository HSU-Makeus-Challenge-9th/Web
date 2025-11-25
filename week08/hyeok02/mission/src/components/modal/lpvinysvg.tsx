import React from 'react';
import lpImage from '../../assets/lp.png';

interface Props {
  thumbnailPreview: string;
  onThumbnailClick: () => void;
}

const LpVinylSvg: React.FC<Props> = ({
  thumbnailPreview,
  onThumbnailClick,
}) => (
  <div
    onClick={onThumbnailClick}
    className="cursor-pointer mx-auto mb-6 w-48 h-48 flex items-center justify-center"
  >
    {thumbnailPreview ? (
      <img
        src={thumbnailPreview}
        alt="LP Vinyl"
        className="w-full h-full rounded-full object-cover shadow-lg"
      />
    ) : (
      <img
        src={lpImage}
        alt="LP Vinyl Placeholder"
        className="w-full h-full rounded-full object-cover shadow-lg"
      />
    )}
  </div>
);

export default LpVinylSvg;
