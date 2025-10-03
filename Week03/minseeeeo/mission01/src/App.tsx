import "./App.css";
import Moviepage from "./pages/MoviePage";

function App() {
  console.log("api key: ", import.meta.env.VITE_TMDB_KEY);
  return <Moviepage />;
}

export default App;
