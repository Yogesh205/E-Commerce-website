import { useEffect } from "react";
import { motion } from "framer-motion";

const WelcomeScreen = ({ onFinish }) => {
  useEffect(() => {
    setTimeout(onFinish, 3000); // 3 seconds baad transition complete hoga
  }, [onFinish]);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex items-center justify-center h-screen bg-black text-white text-4xl font-bold"
    >
      Welcome to HypeMart
    </motion.div>
  );
};

export default WelcomeScreen;
