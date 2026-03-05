import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { Icon, IconButton } from "@chakra-ui/react";
import { IoSend } from "react-icons/io5";

// Komponen Titik-Titik Mengetik
const TypingIndicator = () => (
  <div className="flex space-x-1.5 p-3 bg-white border border-gray-100 rounded-2xl rounded-bl-none shadow-sm w-max">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
        className="w-2 h-2 bg-blue-400 rounded-full"
      />
    ))}
  </div>
);

const Typewriter = ({ text, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text?.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text?.[currentIndex] || "Error");
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-strong:text-purple-600">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
    </div>
  );
};

export default function AskAi() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Halo! Saya asisten AI Ananda Zukhruf. Ada yang ingin ditanyakan tentang pengalaman kerja atau proyek saya?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto Scroll ke bawah setiap ada pesan baru
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      // 1. Cek apakah respons sukses (status 200-299)
      if (!response.ok) {
        // Ambil detail error dari server jika ada
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.text }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Maaf, sepertinya ada gangguan koneksi. Silakan coba lagi nanti." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ask Ai | Azukhrufy Web </title>
        <meta name="description" content="Ananda Zukhruf Personal Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-50 flex items-center justify-center font-sans">
        <div className="w-full h-[100vh] bg-white shadow-2xl overflow-hidden flex flex-col border border-gray-100">
          {/* Header Chat */}
          <div className="bg-[#805AD5] p-6 text-white flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center font-bold text-xl">
              AZ
            </div>
            <div>
              <h3 className="font-bold text-lg">Azukhrufy AI Assistant</h3>
              <p className="text-xs text-purple-100 underline decoration-purple-300">
                Online | Portfolio Helper
              </p>
            </div>
          </div>

          {/* Area Pesan */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f8f9fa]">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed ${
                      msg.role === "user"
                        ? "bg-purple-600 text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-bold mb-1 uppercase tracking-tighter ${
                        msg.role === "user"
                          ? "text-purple-200 text-right"
                          : "text-purple-400"
                      }`}
                    >
                      {msg.role === "user" ? "Anda" : "Assistant AI"}
                    </p>

                    {/* LOGIKA TYPEWRITER DISINI */}
                    {msg.role === "ai" ? (
                      <Typewriter text={msg.content} />
                    ) : (
                      <p className="leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator & Scroll Anchor tetap sama */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <TypingIndicator />
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-blue-500 transition-all">
              <input
                type="text"
                className="flex-1 bg-transparent px-3 py-2 outline-none text-gray-700"
                placeholder="Tanya tentang pengalaman saya..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <IconButton
                isRound
                aria-label="Send Message"
                colorScheme={isLoading ? "gray" : "purple"}
                onClick={handleSend}
                isDisabled={isLoading}
                isLoading={isLoading}
                icon={<Icon as={IoSend} />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
