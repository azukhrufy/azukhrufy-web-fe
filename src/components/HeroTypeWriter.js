import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const HeroTypewriter = ({ words, speed = 0.08, deleteSpeed = 0.04, delay = 4 }) => {
  const [index, setIndex] = useState(0);
  const count = useMotionValue(0);
  
  // Menghasilkan potongan teks berdasarkan nilai count
  const displayText = useTransform(count, (latest) => 
    words[index].slice(0, Math.round(latest))
  );

  useEffect(() => {
    let controls;
    const currentWord = words[index];

    const runAnimation = async () => {
      // 1. Ketik teks
      controls = animate(count, currentWord.length, {
        type: "tween",
        duration: currentWord.length * speed,
        ease: "linear",
      });
      await controls;

      // 2. Jeda setelah selesai mengetik
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));

      // 3. Hapus teks (Backspacing)
      controls = animate(count, 0, {
        type: "tween",
        duration: currentWord.length * deleteSpeed,
        ease: "linear",
      });
      await controls;

      // 4. Pindah ke kata berikutnya
      setIndex((prev) => (prev + 1) % words.length);
    };

    runAnimation();

    return () => controls?.stop();
  }, [index, words, count, speed, deleteSpeed, delay]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <motion.span>{displayText}</motion.span>
      {/* Kursor Berkedip */}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        style={{
          marginLeft: "2px",
          width: "3px",
          height: "1em",
          backgroundColor: "#3b82f6",
          display: "inline-block",
        }}
      />
    </span>
  );
};

export default HeroTypewriter;