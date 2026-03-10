"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { useState } from "react";

function WarmUp({ onDone }: { onDone: () => void }) {
  useFrame(() => {
    onDone();
  });
  return <Preload all />;
}

export default function ThreePreloader() {
  const [active, setActive] = useState(true);

  if (!active) return null;

  return (
    <div style={{ position: "absolute", width: 1, height: 1, opacity: 0.01, pointerEvents: "none" }}>
      <Canvas gl={{ powerPreference: "high-performance", antialias: false }}>
        <WarmUp onDone={() => setActive(false)} />
      </Canvas>
    </div>
  );
}
