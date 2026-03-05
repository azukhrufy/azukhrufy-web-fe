import { motion } from "framer-motion";

export const TypingIndicator = () => {
  const dotVariants = {
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex space-x-1 p-3 bg-gray-100 rounded-2xl w-max">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          variants={dotVariants}
          animate="animate"
          transition={{ delay: i * 0.2 }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
      ))}
    </div>
  );
};
