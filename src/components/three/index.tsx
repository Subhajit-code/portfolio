"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// A sleek, subtle loader to prevent "pop-in"
const LoadingBox = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.1 }}
    className="absolute inset-0 bg-white/5 animate-pulse rounded-lg"
  />
);

export const DynamicParticleField = dynamic(
  () => import("./ParticleField"),
  { ssr: false, loading: () => <LoadingBox /> }
);

export const DynamicParticleRing = dynamic(
  () => import("./ParticleRing"),
  { ssr: false, loading: () => <LoadingBox /> }
);

export const DynamicWaveGrid = dynamic(
  () => import("./WaveGrid"),
  { ssr: false, loading: () => <LoadingBox /> }
);

export const DynamicNetworkGlobe = dynamic(
  () => import("./NetworkGlobe"),
  { ssr: false, loading: () => <LoadingBox /> }
);

export const DynamicNeuralNetwork = dynamic(
  () => import("./NeuralNetwork"),
  { ssr: false, loading: () => <LoadingBox /> }
);

export const DynamicGlassFlow = dynamic(
  () => import("./GlassFlow"),
  { ssr: false, loading: () => <LoadingBox /> }
);
