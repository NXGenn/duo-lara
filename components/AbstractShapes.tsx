"use client";

const AbstractShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top flowing shape */}
      <div
        className="absolute -top-40 -left-20 w-96 h-96 opacity-20 animate-slow-float"
        style={{
          background:
            "linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(249, 115, 22, 0.2) 50%, transparent 100%)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          filter: "blur(40px)",
        }}
      />

      {/* Right side flowing shape */}
      <div
        className="absolute top-20 -right-32 w-80 h-80 opacity-15 animate-slow-float-reverse"
        style={{
          background:
            "linear-gradient(225deg, rgba(239, 68, 68, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)",
          borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          filter: "blur(50px)",
          animationDelay: "2s",
        }}
      />

      {/* Bottom left flowing shape */}
      <div
        className="absolute -bottom-32 -left-40 w-72 h-72 opacity-25 animate-slow-float"
        style={{
          background:
            "linear-gradient(45deg, rgba(249, 115, 22, 0.4) 0%, rgba(239, 68, 68, 0.3) 50%, transparent 100%)",
          borderRadius: "70% 30% 40% 60% / 30% 60% 70% 40%",
          filter: "blur(30px)",
          animationDelay: "4s",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 70%)",
        }}
      />
    </div>
  );
};

export default AbstractShapes;
