"use client";
import Link from "next/link";
import FloatingCard from "./FloatingCard";
import MarqueeBanner from "./MarqueeBanner";
import AbstractShapes from "./AbstractShapes";
import MetallicSphere from "./MetallicSphere";

const Hero = () => {
  const cards = [
    {
      text: "Real Conversations",
      subtitle: "Practice with AI that feels human",
      position: "top-3/4 left-1/4",
      rotation: "-rotate-12",
      icon: "💬",
    },
    {
      text: "Built for Confidence",
      subtitle: "Structured feedback system",
      position: "top-1/3 right-1",
      rotation: "rotate-6",
      icon: "🎯",
    },
    {
      text: "Fast Feedback",
      subtitle: "Instant analysis and insights",
      position: "top-1/6 left-1/4",
      rotation: "rotate-12",
      icon: "⚡",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Abstract Background Shapes */}
      <AbstractShapes />

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        {/* Floating Cards */}
        <div className="absolute inset-0">
          {cards.map((card, index) => (
            <FloatingCard
              key={index}
              text={card.text}
              subtitle={card.subtitle}
              icon={card.icon}
              position={card.position}
              rotation={card.rotation}
              delay={index * 0.3}
            />
          ))}
        </div>

        {/* Metallic Sphere */}
        <MetallicSphere />

        {/* Main Content */}
        <div className="text-center z-20 relative max-w-4xl">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Smarter Prep.
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Sharper Confidence.
            </span>
          </h1>
          <p className="text-xl lg:text-2xl font-medium text-gray-300 mb-8 max-w-2xl mx-auto">
            Unlock the leaders in interview preparation with proven AI
            technology and best experiences
          </p>
          <p className="text-lg font-medium text-yellow-400 mb-12">
            Not only the rich can prep.
          </p>
          <div className="flex justify-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <Link href="/interview">Create New Interview</Link>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.1)" />
              <stop offset="50%" stopColor="rgba(249, 115, 22, 0.2)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0.1)" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 Q300,200 600,400 T1200,300"
            stroke="url(#flowGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0,600 Q400,400 800,600 T1200,500"
            stroke="url(#flowGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>

      {/* Marquee Banner */}
      <MarqueeBanner />
    </div>
  );
};

export default Hero;
