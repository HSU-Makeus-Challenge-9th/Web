import FloatingActionButton from "../components/FloatingActionButton";
import LpSearch from "../components/Lp/LpSearch";

const SearchPage = () => {
  return (
    <div className="min-h-screen">
      <LpSearch />
      <FloatingActionButton to="/create" />
    </div>
  );
};

export default SearchPage;
