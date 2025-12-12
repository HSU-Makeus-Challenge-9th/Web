import { useState } from "react";
import * as S from "./styles/InputStyle";

interface InputProps {
  onChange: (value: string) => void;
  onCategoryChange: (category: "제목" | "태그") => void;
}

const categories = ["제목", "태그"] as const;

const Input = ({ onChange, onCategoryChange }: InputProps) => {
  const [selected, setSelected] = useState<"제목" | "태그">("제목");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className={S.SearchContainer}>
      <div className={S.SearchInnerContainer}>
        <span className={S.SearchIcon}>🔍</span>

        <input
          className={S.SearchInput}
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);
            onChange(value);
          }}
        />

        <div className={S.TypeContainer}>
          <button
            className={S.TypeButtonContainer}
            onClick={() => setOpen((prev) => !prev)}
          >
            {selected} ▼
          </button>

          {open && (
            <ul className={S.TypeButtonDropContainer}>
              {categories.map((c) => (
                <li
                  key={c}
                  className={S.TypeButtonDropInnerContainer}
                  onClick={() => {
                    setSelected(c);
                    onCategoryChange(c);
                    setOpen(false);
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
