import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaneTakeoff, Mic, Send, X, Bot, MicOff } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const botResponses: Record<string, string> = {
  hi: "Hello 👋 I'm your flight booking assistant. How can I help you today?",
  hello: "Hello 👋 I'm your flight booking assistant. How can I help you today?",
  "book flight": "Sure! Please tell me your departure and destination cities.",
  "book a flight": "Sure! Please tell me your departure and destination cities.",
  "cheapest flights": "I can help find cheap flights! What's your destination and preferred travel dates?",
  "show cheapest flights": "I can help find cheap flights! What's your destination and preferred travel dates?",
  "my bookings": "Let me pull up your bookings... You currently have no active bookings. Would you like to search for a new flight?",
  "flight status": "Please provide your flight number or booking reference, and I'll check the status for you.",
};

const quickPrompts = [
  "Book a flight",
  "Show cheapest flights",
  "My bookings",
  "Flight status",
];

const getResponse = (input: string): string => {
  const lower = input.toLowerCase().trim();
  for (const [key, val] of Object.entries(botResponses)) {
    if (lower.includes(key)) return val;
  }
  return "I understand you're looking for help. Could you tell me more about what you need?";
};

interface AIChatAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
}

const AIChatAssistant = ({ isOpen, onToggle }: AIChatAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hello 👋 I'm your Flight Booking Assistant. How can I help you today?",
      isBot: true,
    },
  ]);

  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: idRef.current++,
      text,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = {
        id: idRef.current++,
        text: getResponse(text),
        isBot: true,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const handleVoice = () => {
    setIsListening(true);

    setTimeout(() => {
      setIsListening(false);
      const simulated = "Book a flight to Paris";
      setInput(simulated);
    }, 2000);
  };

  return (
    <>
      {/* Floating Button (ICON CHANGED HERE) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center animate-pulse-glow"
          >
            <PlaneTakeoff className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-border bg-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 gradient-sky">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-primary-foreground" />
                <span className="font-semibold text-primary-foreground">
                  Flight Assistant 🤖
                </span>
              </div>

              <button
                onClick={onToggle}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.isBot
                        ? "bg-secondary text-secondary-foreground rounded-bl-md"
                        : "bg-primary text-primary-foreground rounded-br-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && sendMessage(input)
                  }
                  placeholder="Type a message..."
                  className="w-full pr-10 pl-4 py-2.5 rounded-full bg-secondary text-secondary-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />

                {/* MIC (UNCHANGED) */}
                <button
                  onClick={handleVoice}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 ${
                    isListening
                      ? "text-destructive animate-pulse"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(input)}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatAssistant;