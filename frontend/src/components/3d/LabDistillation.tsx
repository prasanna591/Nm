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
 * LabDistillation — a horizontal glass distillation apparatus: boiling
 * flask → condenser column → receiving flask, with vapor rising through
 * the column and drops forming at the outlet. Unique from LabFlask —
 * this is a process apparatus rather than a single vessel.
 */

function Drop({
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
    ref.current.position.y -= (0.008 + e * 0.015) * (1 + Math.sin(t * 2 + phase) * 0.15);
    if (ref.current.position.y < -0.95) ref.current.position.y = 0.15;
    ref.current.scale.setScalar(1 + Math.sin(t * 3 + phase) * 0.06 + e * 0.08);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshBasicMaterial color="#ecddc8" transparent opacity={0.7} />
    </mesh>
  );
}

function Vapor({
  position,
  phase,
  reduced,
  energy,
}: {
  position: [number, number, number];
  phase: number;
  reduced: boolean;
  energy: MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || reduced) return;
    const e = energy.current;
    const t = state.clock.elapsedTime;
    ref.current.position.y += (0.01 + e * 0.02);
    ref.current.position.x += Math.sin(t * 1.5 + phase) * 0.005;
    if (ref.current.position.y > 0.35) ref.current.position.y = -0.05;
    ref.current.scale.setScalar(1 + Math.sin(t * 2 + phase) * 0.1 + e * 0.15);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.35 + e * 0.25;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 10, 10]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
    </mesh>
  );
}

function Distillation({ reduced, energyRef }: { reduced: boolean; energyRef: MutableRefObject<number> }) {
  const palette = useScenePalette();
  const spin = useRef<THREE.Group>(null);
  const parallax = useRef<THREE.Group>(null);
  const pointer = useScenePointer(!reduced);
  const motion = useSceneMotion(pointer, { enabled: !reduced, idleSpeed: 0.05, tiltScale: 0.3 });
  const { value: focus } = useSectionProgress("[data-scene-host]");

  useFrame((state, delta) => {
    const m = motion.current;
    energyRef.current = sceneBus.step(delta, 2.0) * (reduced ? 0 : 1);
    const f = 0.35 + 0.65 * focus.current;
    if (parallax.current && !reduced) {
      parallax.current.rotation.set(-sceneBus.py * 0.05 * f, sceneBus.px * 0.06 * f, 0);
    }
    if (spin.current && !reduced) {
      spin.current.rotation.set(m.pitch * 0.4 + m.tiltY * 0.4, m.spin + m.yaw * 0.5 + m.tiltX * 0.4, Math.sin(state.clock.elapsedTime * 0.3) * 0.02);
    }
  });

  const drops = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [1.05 + (i % 3) * 0.08, 0.15 - (i / 6) * 0.15, (i % 2) * 0.12 - 0.06] as [number, number, number],
      size: 0.035 + (i % 3) * 0.01,
      phase: i * 1.1,
    }));
  }, []);

  const vapors = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [-0.55 + (i / 8) * 1.1, -0.02, (i % 3) * 0.1 - 0.1] as [number, number, number],
      phase: i * 0.9,
    }));
  }, []);

  return (
    <group ref={parallax}>
      <group ref={spin} position={[0, 0, 0]}>
        {/* Boiling flask (left) */}
        <mesh position={[-1.25, -0.45, 0]}>
          <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.14} roughness={0.2} metalness={0.05} />
        </mesh>
        <mesh position={[-1.25, -0.45, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.32, 24]} />
          <meshStandardMaterial color={palette.metal} roughness={0.3} metalness={0.75} />
        </mesh>
        {/* Boiling liquid */}
        <mesh position={[-1.25, -0.45, 0]}>
          <sphereGeometry args={[0.44, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={0.2} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Boiling bubbles */}
        {Array.from({ length: 10 }, (_, i) => (
          <mesh
            key={i}
            position={[-1.25 + Math.sin(i) * 0.18, -0.45 + (i / 10) * 0.28, Math.cos(i) * 0.18]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
          </mesh>
        ))}

        {/* Condenser column (horizontal tube) */}
        <mesh position={[0, -0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.52, 0.52, 2.1, 32]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.16} roughness={0.2} metalness={0.05} />
        </mesh>
        <mesh position={[0, -0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.14, 0.14, 2.05, 24]} />
          <meshStandardMaterial color={palette.metal} transparent opacity={0.35} roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Condenser jacket rings */}
        {[-0.7, -0.2, 0.3, 0.8].map((x, i) => (
          <mesh key={i} position={[x, -0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.56, 0.018, 12, 32]} />
            <meshStandardMaterial color={palette.metal} roughness={0.3} metalness={0.8} />
          </mesh>
        ))}

        {/* Vapor rising in column */}
        {vapors.map((v, i) => (
          <Vapor key={i} {...v} reduced={reduced} energy={energyRef} />
        ))}

        {/* Receiving flask (right) */}
        <mesh position={[1.25, -0.45, 0]}>
          <sphereGeometry args={[0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.14} roughness={0.2} metalness={0.05} />
        </mesh>
        <mesh position={[1.25, -0.45, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.28, 24]} />
          <meshStandardMaterial color={palette.metal} roughness={0.3} metalness={0.75} />
        </mesh>
        {/* Collected distillate */}
        <mesh position={[1.25, -0.45, 0]}>
          <sphereGeometry args={[0.36, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#ecddc8" transparent opacity={0.65} roughness={0.15} metalness={0.05} />
        </mesh>

        {/* Drops at outlet */}
        {drops.map((d, i) => (
          <Drop key={i} {...d} reduced={reduced} energy={energyRef} />
        ))}

        {/* Support clamps */}
        {[-1.0, 1.0].map((x, i) => (
          <mesh key={i} position={[x, -0.45, 0.55]}>
            <boxGeometry args={[0.1, 0.12, 0.1]} />
            <meshStandardMaterial color={palette.dark} roughness={0.4} metalness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function LabDistillation() {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const energyRef = useRef(0);

  return (
    <Canvas
      dpr={[1, isDesktop ? 1.5 : 1.1]}
      camera={{ position: [0, 1.6, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 4, 4]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color="#7e2f3a" />
      <Float speed={1.05} rotationIntensity={0.12} floatIntensity={0.35}>
        <Distillation reduced={reduced} energyRef={energyRef} />
      </Float>
    </Canvas>
  );
}
