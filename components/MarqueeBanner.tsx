"use client";

const MarqueeBanner = () => {
  return (
    <div className="absolute bottom-0 left-0 h-full w-full  overflow-hidden pointer-events-none">
      {/* Diagonal marquee container */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: "rotate(-7deg)",
        }}
      >
        <div className="relative w-[150%] bg-yellow-400 border-y-2 border-yellow-500 py-3">
          {/* Background with flowing gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400"></div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 shadow-lg shadow-yellow-500/20"></div>

          <div className="relative">
            <div className="animate-marquee-diagonal whitespace-nowrap flex">
              <span className="text-black font-bold text-base lg:text-lg mx-8 flex-shrink-0">
                Confidence isn't taught. It's trained — one mock at a time.
              </span>
              <span className="text-black/60 mx-4 flex-shrink-0">•</span>
              <span className="text-black font-bold text-base lg:text-lg mx-8 flex-shrink-0">
                AI-powered mock interviews for everyone
              </span>
              <span className="text-black/60 mx-4 flex-shrink-0">•</span>
              <span className="text-black font-bold text-base lg:text-lg mx-8 flex-shrink-0">
                Confidence isn't taught. It's trained — one mock at a time.
              </span>
              <span className="text-black/60 mx-4 flex-shrink-0">•</span>
              <span className="text-black font-bold text-base lg:text-lg mx-8 flex-shrink-0">
                AI-powered mock interviews for everyone
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
