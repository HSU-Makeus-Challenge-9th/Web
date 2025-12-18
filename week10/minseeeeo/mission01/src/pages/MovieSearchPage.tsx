import { useState, useCallback } from "react";
import Searchbar from "../components/MovieSearchPage/Searchbar";
import MovieList from "../components/MovieSearchPage/MovieList";

const MovieSearchPage = () => {
  const [search, setSearch] = useState<string>("코난");
  const [adultChecked, setAdultChecked] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("ko-KR");

  const handleSearch = useCallback((keyword: string) => {
    setSearch(keyword);
    console.log("❤️ 검색어: ", keyword);
  }, []);

  const handleAdultChange = useCallback((checked: boolean) => {
    setAdultChecked(checked);
    console.log("💙 성인 콘텐츠: ", checked);
  }, []);

  const handleLanguageChange = useCallback((language: string) => {
    setLanguage(language);
    console.log("🧡 언어: ", language);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Searchbar
        search={search}
        adultChecked={adultChecked}
        language={language}
        onSearchChange={handleSearch}
        onAdultChange={handleAdultChange}
        onLanguageChange={handleLanguageChange}
      />
      <MovieList
        search={search}
        adultChecked={adultChecked}
        language={language}
      />
    </div>
  );
};

export default MovieSearchPage;
