import { useState, type ReactNode } from "react";
import { SearchModalContext } from "../context/SearchModalContext";

export const SearchModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const toggleSearchModal = () => {
    setIsSearchModalOpen((prev) => !prev);
  };

  return (
    <SearchModalContext.Provider
      value={{ isSearchModalOpen, toggleSearchModal }}
    >
      {children}
    </SearchModalContext.Provider>
  );
};
