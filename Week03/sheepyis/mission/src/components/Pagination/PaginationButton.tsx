import * as S from "./PaginationStyle";

interface PaginationButtonProps {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const PaginationButton = ({
  disabled,
  onClick,
  children,
}: PaginationButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${S.PaginationButtonContainer}
        appearance-none border-0
        ${
          disabled
            ? "!bg-gray-500 !text-white cursor-not-allowed"
            : "!bg-blue-900 !text-white"
        }
      `}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
