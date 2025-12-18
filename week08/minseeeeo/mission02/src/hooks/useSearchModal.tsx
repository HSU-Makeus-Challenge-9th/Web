import { createContext, useContext, useState, ReactNode } from "react";

interface SearchModalContextType {
  isSearchModalOpen: boolean;
  toggleSearchModal: () => void;
  closeSearchModal: () => void;
}

const SearchModalContext = createContext<SearchModalContextType | undefined>(
  undefined
);

export const SearchModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const toggleSearchModal = () => {
    setIsSearchModalOpen((prev) => !prev);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  return (
    <SearchModalContext.Provider
      value={{ isSearchModalOpen, toggleSearchModal, closeSearchModal }}
    >
      {children}
    </SearchModalContext.Provider>
  );
};

export const useSearchModal = () => {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error("useSearchModal must be used within SearchModalProvider");
  }
  return context;
};
