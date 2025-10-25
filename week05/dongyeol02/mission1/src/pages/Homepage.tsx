import { useLocalStorage } from "../hooks/useLocalStorage";

const Homepage = () => {
  const [token] = useLocalStorage<string>("accessToken", "");
  console.log(token);
  return (
    <div>
      <div>Homepage</div>
      <div>token {token}</div>
    </div>
  );
};

export default Homepage;
