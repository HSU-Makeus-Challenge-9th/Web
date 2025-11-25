import "./App.css";
import { UserDataDisplay, WelcomeData } from "./components/UserDataDisplay";
import { useCustomFetch } from "./hooks/useCustomFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

function App(): Element {
  return <WelcomeData />;
}

export default App;
