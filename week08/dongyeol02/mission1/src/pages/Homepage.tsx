import FloatingActionButton from "../components/FloatingActionButton";
import LpList from "../components/Lp/LpList";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <LpList />
      <FloatingActionButton to="/create" />
    </div>
  );
};

export default Homepage;
