import { createContext } from "react";

interface SearchModalContextType {
  isSearchModalOpen: boolean;
  toggleSearchModal: () => void;
}

export const SearchModalContext = createContext<
  SearchModalContextType | undefined
>(undefined);
