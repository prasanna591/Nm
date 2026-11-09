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
 * MicroscopeSlide — a glass slide with a grid of stained specimen cells,
 * a coverslip and stage clips. Cells pulse gently and respond to the
 * shared sceneBus energy. Unique from AtomOrbit/DNAHelix — this is a
 * top-down histological view rather than an orbital or helical form.
 */

function Cell({
  position,
  color,
  size,
  phase,
  reduced,
  energy,
}: {
  position: [number, number, number];
  color: string;
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
    const s = 1 + Math.sin(t * 1.2 + phase) * 0.06 + e * 0.1;
    ref.current.scale.setScalar(s);
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.1 + e * 0.2;
  });
  return (
    <mesh ref={ref} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[size, size, 0.04, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.12}
        roughness={0.35}
        metalness={0.15}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function Nucleus({ position, size, color, reduced, energy }: { position: [number, number, number]; size: number; color: string; reduced: boolean; energy: MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || reduced) return;
    const e = energy.current;
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03 + e * 0.05);
  });
  return (
    <mesh ref={ref} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[size * 0.45, size * 0.45, 0.02, 12]} />
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
    </mesh>
  );
}

function Slide({ reduced, energyRef }: { reduced: boolean; energyRef: MutableRefObject<number> }) {
  const palette = useScenePalette();
  const spin = useRef<THREE.Group>(null);
  const parallax = useRef<THREE.Group>(null);
  const pointer = useScenePointer(!reduced);
  const motion = useSceneMotion(pointer, { enabled: !reduced, idleSpeed: 0.06, tiltScale: 0.35 });
  const { value: focus } = useSectionProgress("[data-scene-host]");

  useFrame((_, delta) => {
    const m = motion.current;
    energyRef.current = sceneBus.step(delta, 2.2) * (reduced ? 0 : 1);
    const f = 0.35 + 0.65 * focus.current;
    if (parallax.current && !reduced) {
      parallax.current.rotation.set(-sceneBus.py * 0.05 * f, sceneBus.px * 0.06 * f, 0);
    }
    if (spin.current && !reduced) {
      spin.current.rotation.set(m.pitch * 0.4 + m.tiltY * 0.4, m.spin + m.yaw * 0.5 + m.tiltX * 0.4, 0);
    }
  });

  const cells = useMemo(() => {
    const result: Array<{ position: [number, number, number]; color: string; size: number; phase: number }> = [];
    const rng = (() => { let s = 0x31c; return () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; })();
    const paletteColors = [palette.accent, palette.accentDeep, palette.metal, palette.glass];
    for (let i = 0; i < 24; i++) {
      const x = (rng() - 0.5) * 1.6;
      const z = (rng() - 0.5) * 1.6;
      result.push({
        position: [x, 0.02, z],
        color: paletteColors[i % paletteColors.length],
        size: 0.12 + rng() * 0.08,
        phase: rng() * Math.PI * 2,
      });
    }
    return result;
  }, [palette.accent, palette.accentDeep, palette.metal, palette.glass]);

  return (
    <group ref={parallax}>
      <group ref={spin} position={[0, 0, 0]}>
        {/* Slide base */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[1.9, 0.04, 1.4]} />
          <meshStandardMaterial color={palette.surface} roughness={0.55} metalness={0.1} />
        </mesh>

        {/* Stage clips */}
        {[-0.8, 0.8].map((x, i) => (
          <mesh key={i} position={[x, 0.03, 0.55]}>
            <boxGeometry args={[0.18, 0.02, 0.28]} />
            <meshStandardMaterial color={palette.metal} roughness={0.3} metalness={0.8} />
          </mesh>
        ))}
        {[-0.8, 0.8].map((x, i) => (
          <mesh key={`c-${i}`} position={[x, 0.03, -0.55]}>
            <boxGeometry args={[0.18, 0.02, 0.28]} />
            <meshStandardMaterial color={palette.metal} roughness={0.3} metalness={0.8} />
          </mesh>
        ))}

        {/* Coverslip */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[1.7, 0.012, 1.2]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.55} roughness={0.05} metalness={0.05} />
        </mesh>

        {/* Specimen cells */}
        {cells.map((c, i) => (
          <Cell key={i} {...c} reduced={reduced} energy={energyRef} />
        ))}
        {cells.map((c, i) => (
          <Nucleus key={`n-${i}`} position={c.position} size={c.size} color="#1a120f" reduced={reduced} energy={energyRef} />
        ))}
      </group>
    </group>
  );
}

export default function MicroscopeSlide() {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const energyRef = useRef(0);

  return (
    <Canvas
      dpr={[1, isDesktop ? 1.5 : 1.1]}
      camera={{ position: [0, 2.6, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.75} />
      <pointLight position={[2, 3, 3]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-2, -1, 3]} intensity={0.5} color="#7e2f3a" />
      <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.3}>
        <Slide reduced={reduced} energyRef={energyRef} />
      </Float>
    </Canvas>
  );
}
