import NavBar from "../components/NavBar/NavBar";
import ThemeContent from "../components/ThemeContent/ThemeContent";

function ContextPage(): React.ReactElement {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <NavBar />
      <main className="flex-1 w-full">
        <ThemeContent />
      </main>
    </div>
  );
}

export default ContextPage;
