import React from 'react';

interface Props {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const LpPublishCheckbox: React.FC<Props> = ({ checked, onChange }) => (
  <label className="flex items-center mb-3">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="mr-2"
    />
    공개 여부
  </label>
);

export default LpPublishCheckbox;
