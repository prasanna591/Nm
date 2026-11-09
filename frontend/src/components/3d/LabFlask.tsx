import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScenePointer } from "@/hooks/useScenePointer";
import { useSceneMotion } from "@/hooks/useSceneMotion";
import { useScenePalette } from "@/hooks/useScenePalette";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { sceneBus } from "@/lib/sceneBus";

/**
 * LabFlask — a clean Erlenmeyer flask with layered reagent liquids,
 * rising bubbles and a subtle meniscus. Responds to pointer parallax and
 * the shared sceneBus energy (brighter liquid, faster bubbles).
 */

function Bubble({
  position,
  size,
  phase,
  reduced,
  energy,
}: {
  position: [number, number, number];
  size: number;
  phase: number;
  reduced: boolean;
  energy: MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || reduced) return;
    const e = energy.current;
    const t = state.clock.elapsedTime;
    ref.current.position.y += (0.015 + e * 0.02) * (1 + Math.sin(t * 3 + phase) * 0.1);
    if (ref.current.position.y > 1.6) ref.current.position.y = -1.4;
    ref.current.scale.setScalar(1 + Math.sin(t * 2 + phase) * 0.05 + e * 0.05);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
    </mesh>
  );
}

function Flask({ reduced, energyRef }: { reduced: boolean; energyRef: MutableRefObject<number> }) {
  const palette = useScenePalette();
  const spin = useRef<THREE.Group>(null);
  const parallax = useRef<THREE.Group>(null);
  const pointer = useScenePointer(!reduced);
  const motion = useSceneMotion(pointer, { enabled: !reduced, idleSpeed: 0.08, tiltScale: 0.4 });
  const { value: focus } = useSectionProgress("[data-scene-host]");

  useFrame((state, delta) => {
    const m = motion.current;
    energyRef.current = sceneBus.step(delta, 2.5) * (reduced ? 0 : 1);
    const f = 0.35 + 0.65 * focus.current;
    if (parallax.current && !reduced) {
      parallax.current.rotation.set(-sceneBus.py * 0.05 * f, sceneBus.px * 0.06 * f, 0);
    }
    if (spin.current && !reduced) {
      spin.current.rotation.set(m.pitch * 0.5 + m.tiltY * 0.5, m.spin + m.yaw * 0.6 + m.tiltX * 0.5, 0);
      spin.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.02 + energyRef.current * 0.02 * f;
    }
  });

  const bubbles = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2;
      const r = 0.35 + (i % 5) * 0.12;
      return {
        position: [Math.cos(a) * r, -1.2 + (i / 14) * 2.6, Math.sin(a) * r] as [number, number, number],
        size: 0.025 + (i % 4) * 0.012,
        phase: i * 0.9,
      };
    });
  }, []);

  return (
    <group ref={parallax}>
      <group ref={spin} position={[0, -0.1, 0]}>
        {/* Flask base */}
        <mesh position={[0, -1.35, 0]}>
          <cylinderGeometry args={[1.15, 1.22, 0.12, 64]} />
          <meshStandardMaterial color={palette.metal} roughness={0.35} metalness={0.7} />
        </mesh>

        {/* Conical body */}
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[1.0, 1.2, 1.3, 64, 1, true]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.12} roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.34, 0.38, 0.7, 32]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.14} roughness={0.2} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.92, 0]}>
          <torusGeometry args={[0.4, 0.02, 12, 32]} />
          <meshStandardMaterial color={palette.metal} roughness={0.3} metalness={0.75} />
        </mesh>

        {/* Liquid layers */}
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.98, 1.18, 0.02, 64]} />
          <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={0.15} transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.96, 1.14, 0.02, 64]} />
          <meshStandardMaterial color={palette.accentDeep} emissive={palette.accentDeep} emissiveIntensity={0.1} transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.94, 1.1, 0.02, 64]} />
          <meshStandardMaterial color={palette.metal} emissive={palette.metal} emissiveIntensity={0.08} transparent opacity={0.7} />
        </mesh>

        {/* Meniscus */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.92, 1.08, 0.015, 64, 1, true]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.35} roughness={0.1} metalness={0.05} />
        </mesh>

        {/* Bubbles */}
        {bubbles.map((b, i) => (
          <Bubble key={i} {...b} reduced={reduced} energy={energyRef} />
        ))}

        {/* Condensation droplets */}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.0, -0.6, Math.sin(a) * 1.0]}>
              <sphereGeometry args={[0.035, 10, 10]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.45} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default function LabFlask() {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const energyRef = useRef(0);

  return (
    <Canvas
      dpr={[1, isDesktop ? 1.5 : 1.1]}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 4, 4]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color="#7e2f3a" />
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
        <Flask reduced={reduced} energyRef={energyRef} />
      </Float>
    </Canvas>
  );
}
