"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";

function ParticleSwarm({ count = 1200 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 12;

      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }

    return p;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#C9A84C"   // 🌟 gold particles (wedding theme)
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.25}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function CanvasBackground() {
  return (
    <>
      {/* 🌿 Clean cinematic background (no bold gradient) */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #FAF7F0, #FAF7F0)",
        }}
      />

      {/* ✨ 3D particle layer */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <ParticleSwarm />
        </Canvas>
      </div>

      {/* 🌫 Optional soft overlay for readability */}
      <div
        className="fixed inset-0 -z-10"
        style={{
           background: "linear-gradient(180deg, #FAF7F0, #E4C77433)",
        }}
      />
    </>
  );
}