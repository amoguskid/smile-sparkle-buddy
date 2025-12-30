import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  emoji: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const emojis = ["✨", "⭐", "🦷", "💫", "🌟", "💖", "🫧"];
    const newElements: FloatingElement[] = [];
    
    for (let i = 0; i < 12; i++) {
      newElements.push({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        size: 1.5 + Math.random() * 1.5,
      });
    }
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float opacity-40"
          style={{
            left: `${el.left}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
            fontSize: `${el.size}rem`,
          }}
        >
          {el.emoji}
        </div>
      ))}
    </div>
  );
};