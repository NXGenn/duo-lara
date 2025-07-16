"use client";

const MetallicSphere = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-0">
      <div className="relative">
        {/* Main Sphere */}
        <div
          className="w-80 h-80 lg:w-96 lg:h-96 rounded-full animate-slow-spin"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                rgba(251, 191, 36, 0.8) 0%,
                rgba(249, 115, 22, 0.9) 25%,
                rgba(239, 68, 68, 0.8) 50%,
                rgba(147, 51, 234, 0.6) 75%,
                rgba(30, 30, 30, 0.9) 100%
              )
            `,
            boxShadow: `
              inset -20px -20px 60px rgba(0,0,0,0.4),
              inset 20px 20px 60px rgba(255,255,255,0.1),
              0 0 100px rgba(249, 115, 22, 0.3),
              0 0 200px rgba(239, 68, 68, 0.2)
            `,
          }}
        >
          {/* Metallic highlights */}
          <div
            className="absolute top-8 left-8 w-16 h-16 rounded-full opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
            }}
          />

          {/* Flowing texture lines */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `
                  repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 2px,
                    rgba(255,255,255,0.1) 2px,
                    rgba(255,255,255,0.1) 4px
                  )
                `,
              }}
            />
          </div>
        </div>

        {/* Outer glow rings */}
        <div className="absolute inset-0 rounded-full animate-pulse">
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, transparent 60%, rgba(249, 115, 22, 0.1) 70%, transparent 80%)",
            }}
          />
        </div>

        {/* Ambient light */}
        <div className="absolute inset-0 -m-20 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-orange-400/20 via-red-400/20 to-purple-400/20 animate-pulse" />
      </div>
    </div>
  );
};

export default MetallicSphere;
