import { motion } from "framer-motion";

function HomePage() {
  return (
    <div
      className="container item-center"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        perspective: 800,
      }}
    >
      <motion.div
        style={{
          fontSize: "200px",
          fontWeight: 1000,
          display: "inline-block",
          textAlign: "center",
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
      >
        MOVIE
      </motion.div>
    </div>
  );
}

export default HomePage;
