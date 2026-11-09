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
 * CellMitosis — a single cell progressing through division: the membrane
 * pinches inward (cleavage furrow) while chromosomes align at the equator
 * on spindle fibers, then two daughter cells separate. Unique from the
 * existing orbital/helical/labware components — this is cellular biology.
 */

function SpindleFiber({
  from,
  to,
  phase,
  reduced,
  energy,
}: {
  from: [number, number, number];
  to: [number, number, number];
  phase: number;
  reduced: boolean;
  energy: MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { position, quaternion, length } = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const direction = new THREE.Vector3().subVectors(end, start);
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const rotation = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize(),
    );
    return { position: midpoint.toArray() as [number, number, number], quaternion: rotation, length: direction.length() };
  }, [from, to]);

  useFrame((state) => {
    if (!ref.current || reduced) return;
    const e = energy.current;
    const t = state.clock.elapsedTime;
    const wobble = Math.sin(t * 2 + phase) * 0.02 + e * 0.03;
    ref.current.scale.y = length * (1 + wobble);
    ref.current.position.copy(new THREE.Vector3(...position));
    ref.current.quaternion.copy(new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(...to).sub(new THREE.Vector3(...from)).normalize(),
    ));
  });

  return (
    <mesh ref={ref} position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.018, 0.018, length, 8]} />
      <meshStandardMaterial color="#7e2f3a" roughness={0.4} metalness={0.3} transparent opacity={0.55} />
    </mesh>
  );
}

function Chromosome({
  position,
  color,
  phase,
  reduced,
  energy,
}: {
  position: [number, number, number];
  color: string;
  phase: number;
  reduced: boolean;
  energy: MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || reduced) return;
    const e = energy.current;
    const t = state.clock.elapsedTime;
    const s = 1 + Math.sin(t * 1.5 + phase) * 0.08 + e * 0.1;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.09, 0.09, 0.025]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.18} roughness={0.35} metalness={0.2} />
    </mesh>
  );
}

function CellBody({
  reduced,
  split,
  furrowDepth,
}: {
  reduced: boolean;
  split: number;
  furrowDepth: number;
}) {
  const palette = useScenePalette();
  const ref = useRef<THREE.Mesh>(null);
  const spin = useRef<THREE.Group>(null);
  const parallax = useRef<THREE.Group>(null);
  const pointer = useScenePointer(!reduced);
  const motion = useSceneMotion(pointer, { enabled: !reduced, idleSpeed: 0.05, tiltScale: 0.3 });
  const { value: focus } = useSectionProgress("[data-scene-host]");

  useFrame((state, delta) => {
    const m = motion.current;
    const e = sceneBus.step(delta, 2.0) * (reduced ? 0 : 1);
    const f = 0.35 + 0.65 * focus.current;
    if (parallax.current && !reduced) {
      parallax.current.rotation.set(-sceneBus.py * 0.05 * f, sceneBus.px * 0.06 * f, 0);
    }
    if (spin.current && !reduced) {
      spin.current.rotation.set(m.pitch * 0.4 + m.tiltY * 0.4, m.spin + m.yaw * 0.5 + m.tiltX * 0.4, Math.sin(state.clock.elapsedTime * 0.4) * 0.03);
      spin.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.015 + e * 0.015 * f;
    }
    if (ref.current) {
      const s = 1 + e * 0.05;
      ref.current.scale.setScalar(s);
      (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15 + e * 0.15;
    }
  });

  const r = 0.55;
  const segments = 64;
  const positions = new Float32Array((segments + 1) * 3);
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    // pinch at equator when splitting
    const pinch = 1 - split * 0.45;
    positions[i * 3] = Math.cos(a) * r * pinch;
    positions[i * 3 + 1] = -0.5 + furrowDepth;
    positions[i * 3 + 2] = Math.sin(a) * r * pinch;
  }

  return (
    <group ref={parallax}>
      <group ref={spin}>
        {/* Cell membrane / boundary */}
        <mesh ref={ref} position={[0, 0, 0]}>
          <cylinderGeometry args={[r * (1 - split * 0.45), r * (1 - split * 0.45), 1.0, segments, 1, true]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.18} roughness={0.2} metalness={0.05} />
        </mesh>
        {/* Cytoplasm fill */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[r * 0.92 * (1 - split * 0.4), r * 0.92 * (1 - split * 0.4), 0.92, segments]} />
          <meshStandardMaterial color={palette.glass} transparent opacity={0.25} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Nucleus (shrinks as division proceeds) */}
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.28 * (1 - split * 0.85), 16, 16]} />
          <meshStandardMaterial color={palette.accentDeep} emissive={palette.accentDeep} emissiveIntensity={0.12} roughness={0.4} metalness={0.15} transparent opacity={0.9} />
        </mesh>
        {/* Cleavage furrow line */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[r * (1 - split * 0.45) * 0.98, 0.012, 12, 64]} />
          <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={0.25} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function MitosisScene({ reduced, energy }: { reduced: boolean; energy: MutableRefObject<number> }) {
  const spin = useRef<THREE.Group>(null);
  const parallax = useRef<THREE.Group>(null);
  const pointer = useScenePointer(!reduced);
  const motion = useSceneMotion(pointer, { enabled: !reduced, idleSpeed: 0.04, tiltScale: 0.3 });
  const { value: focus } = useSectionProgress("[data-scene-host]");

  // Division cycle: 0 -> 1 over time
  const cycle = useRef(0);
  useFrame((_, delta) => {
    const m = motion.current;
    const e = sceneBus.step(delta, 1.8) * (reduced ? 0 : 1);
    const f = 0.35 + 0.65 * focus.current;
    if (!reduced) cycle.current += delta * 0.15 * (1 + e);
    if (cycle.current > 1) cycle.current = 0;
    if (parallax.current && !reduced) {
      parallax.current.rotation.set(-sceneBus.py * 0.05 * f, sceneBus.px * 0.06 * f, 0);
    }
    if (spin.current && !reduced) {
      spin.current.rotation.set(m.pitch * 0.3 + m.tiltY * 0.3, m.spin + m.yaw * 0.4 + m.tiltX * 0.3, 0);
    }
  });

  const split = Math.min(1, cycle.current * 1.6);
  const furrowDepth = Math.sin(cycle.current * Math.PI) * 0.35;

  // Spindle fibers from poles to equator
  const fibers = useMemo(() => {
    return [
      { from: [0, 0.65, 0] as [number, number, number], to: [0, 0, 0] as [number, number, number], phase: 0 },
      { from: [0, -0.65, 0] as [number, number, number], to: [0, 0, 0] as [number, number, number], phase: 1 },
      { from: [-0.4, 0.5, 0.2] as [number, number, number], to: [0, 0, 0] as [number, number, number], phase: 0.7 },
      { from: [0.4, -0.5, -0.2] as [number, number, number], to: [0, 0, 0] as [number, number, number], phase: 1.4 },
    ];
  }, []);

  // Chromosomes at equator
  const chromosomes = useMemo(() => {
    return [
      { position: [-0.18, 0, 0.05] as [number, number, number], color: "#7e2f3a", phase: 0 },
      { position: [0.18, 0, -0.05] as [number, number, number], color: "#5c1e28", phase: 1 },
      { position: [0, 0, 0.18] as [number, number, number], color: "#a07a4f", phase: 2 },
      { position: [0, 0, -0.18] as [number, number, number], color: "#4a3d33", phase: 3 },
    ];
  }, []);

  return (
    <group ref={parallax}>
      <group ref={spin}>
        <SpindleFiber
          from={fibers[0].from}
          to={fibers[0].to}
          phase={fibers[0].phase}
          reduced={reduced}
          energy={energy}
        />
        <SpindleFiber
          from={fibers[1].from}
          to={fibers[1].to}
          phase={fibers[1].phase}
          reduced={reduced}
          energy={energy}
        />
        <SpindleFiber
          from={fibers[2].from}
          to={fibers[2].to}
          phase={fibers[2].phase}
          reduced={reduced}
          energy={energy}
        />
        <SpindleFiber
          from={fibers[3].from}
          to={fibers[3].to}
          phase={fibers[3].phase}
          reduced={reduced}
          energy={energy}
        />
        {chromosomes.map((c, i) => (
          <Chromosome key={i} {...c} reduced={reduced} energy={energy} />
        ))}
        <CellBody reduced={reduced} split={split} furrowDepth={furrowDepth} />
      </group>
    </group>
  );
}

export default function CellMitosis() {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const energy = useRef(0);

  return (
    <Canvas
      dpr={[1, isDesktop ? 1.5 : 1.1]}
      camera={{ position: [0, 0, 4.4], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 4, 4]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color="#7e2f3a" />
      <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.3}>
        <MitosisScene reduced={reduced} energy={energy} />
      </Float>
    </Canvas>
  );
}
