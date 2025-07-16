"use client";

import { useEffect, useState } from "react";

interface FloatingCardProps {
  text: string;
  subtitle: string;
  icon: string;
  position: string;
  rotation: string;
  delay: number;
}

const FloatingCard = ({
  text,
  subtitle,
  icon,
  position,
  rotation,
  delay,
}: FloatingCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 10000);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute ${position} ${rotation} transform transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      <div className="relative block">
        <div
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl animate-subtle-float hover:scale-105 transition-transform duration-300"
          style={{
            animationDelay: `${delay}s`,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{icon}</span>
            <div className="text-white font-semibold text-sm lg:text-base whitespace-nowrap">
              {text}
            </div>
          </div>
          <div className="text-gray-400 text-xs lg:text-sm whitespace-nowrap max-w-32 lg:max-w-48">
            {subtitle}
          </div>
          <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-4"></div>
        </div>

        {/* Enhanced glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-2xl blur-xl opacity-60 -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-red-400/5 rounded-2xl blur-2xl opacity-40 -z-20 scale-110"></div>
      </div>
    </div>
  );
};

export default FloatingCard;
