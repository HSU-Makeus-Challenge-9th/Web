interface SidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarOverlay = ({ isOpen, onClose }: SidebarOverlayProps) => {
  return (
    <div
      className={`
        fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden
        transition-opacity duration-300
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}
      onClick={onClose}
    />
  );
};

export default SidebarOverlay;