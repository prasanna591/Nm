import { useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScenePalette, type ScenePalette } from "@/hooks/useScenePalette";
import LabFlask from "./LabFlask";
import MicroscopeSlide from "./MicroscopeSlide";
import CellMitosis from "./CellMitosis";
import LabDistillation from "./LabDistillation";

export type LabDiagramVariant = "molecule" | "centrifuge" | "flask" | "slide" | "mitosis" | "distillation";

type Vec3 = [number, number, number];

function GlassMaterial({
  color,
  opacity = 0.18,
}: {
  color: string;
  opacity?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      transparent
      opacity={opacity}
      roughness={0.12}
      metalness={0.08}
      depthWrite={false}
      side={THREE.DoubleSide}
    />
  );
}

function LiquidMaterial({
  color,
  opacity = 0.48,
}: {
  color: string;
  opacity?: number;
}) {
  return (
    <meshStandardMaterial
      color={color}
      transparent
      opacity={opacity}
      roughness={0.28}
      metalness={0.05}
      depthWrite={false}
    />
  );
}

function Spin({
  children,
  reduced,
  speed = 0.12,
}: {
  children: ReactNode;
  reduced: boolean;
  speed?: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * speed;
  });

  return <group ref={ref}>{children}</group>;
}



function Bond({ from, to, color }: { from: Vec3; to: Vec3; color: string }) {
  const { position, quaternion, length } = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const direction = new THREE.Vector3().subVectors(end, start);
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const rotation = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize(),
    );
    return {
      position: midpoint.toArray() as Vec3,
      quaternion: rotation,
      length: direction.length(),
    };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.035, 0.035, length, 8]} />
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.45} />
    </mesh>
  );
}

function Molecule({ palette, reduced }: { palette: ScenePalette; reduced: boolean }) {
  const ring = useMemo<Vec3[]>(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return [Math.cos(angle) * 1.25, Math.sin(angle) * 1.0, 0] as Vec3;
      }),
    [],
  );

  const branches = useMemo(
    () => [
      { to: [0.1, 1.95, 0.1] as Vec3, color: palette.accent, size: 0.21 },
      { to: [1.95, 0.55, -0.12] as Vec3, color: palette.metal, size: 0.18 },
      { to: [-1.9, -0.95, 0.18] as Vec3, color: palette.glass, size: 0.23 },
      { to: [0.2, -1.85, 0.08] as Vec3, color: palette.accentDeep, size: 0.2 },
    ],
    [palette.accent, palette.accentDeep, palette.glass, palette.metal],
  );

  return (
    <Spin reduced={reduced} speed={0.16}>
      <group rotation={[0.1, 0, -0.08]}>
        {ring.map((point, i) => (
          <Bond key={`r-${i}`} from={point} to={ring[(i + 1) % ring.length]} color={palette.metal} />
        ))}
        {ring.map((point, i) => (
          <mesh key={`a-${i}`} position={point}>
            <sphereGeometry args={[i % 2 === 0 ? 0.24 : 0.21, 24, 24]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? palette.metal : palette.accent}
              emissive={i % 2 === 0 ? palette.metal : palette.accent}
              emissiveIntensity={0.12}
              roughness={0.28}
              metalness={0.55}
            />
          </mesh>
        ))}
        {branches.map((branch, i) => (
          <group key={`branch-${i}`}>
            <Bond from={ring[i % ring.length]} to={branch.to} color={branch.color} />
            <mesh position={branch.to}>
              <sphereGeometry args={[branch.size, 22, 22]} />
              <meshStandardMaterial
                color={branch.color}
                emissive={branch.color}
                emissiveIntensity={0.18}
                roughness={0.3}
                metalness={0.4}
              />
            </mesh>
          </group>
        ))}
      </group>
    </Spin>
  );
}



function Centrifuge({ palette, reduced }: { palette: ScenePalette; reduced: boolean }) {
  return (
    <group position={[0, -0.1, 0]} rotation={[0.1, -0.36, 0]}>
      <mesh position={[0, -1.18, 0]}>
        <cylinderGeometry args={[2.0, 2.12, 0.76, 64]} />
        <meshStandardMaterial color={palette.metal} roughness={0.34} metalness={0.72} />
      </mesh>
      <mesh position={[0, -0.74, 0]}>
        <cylinderGeometry args={[1.82, 1.92, 0.2, 64]} />
        <meshStandardMaterial color={palette.dark} roughness={0.4} metalness={0.62} />
      </mesh>
      <Spin reduced={reduced} speed={0.65}>
        <group position={[0, -0.52, 0]}>
          <mesh>
            <cylinderGeometry args={[1.52, 1.52, 0.18, 64]} />
            <meshStandardMaterial color={palette.metal} roughness={0.32} metalness={0.75} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.44, 0.44, 0.46, 32]} />
            <meshStandardMaterial color={palette.dark} roughness={0.36} metalness={0.7} />
          </mesh>
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <group key={i} rotation={[0, angle, 0]}>
                <mesh position={[0.78, 0, 0]}>
                  <boxGeometry args={[1.24, 0.09, 0.2]} />
                  <meshStandardMaterial color={palette.metal} roughness={0.35} metalness={0.7} />
                </mesh>
                <group position={[1.28, 0.12, 0]} rotation={[0, 0, -0.42]}>
                  <mesh>
                    <cylinderGeometry args={[0.14, 0.14, 0.66, 18, 1, true]} />
                    <GlassMaterial color={palette.glass} opacity={0.28} />
                  </mesh>
                  <mesh position={[0, -0.16, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.28, 18]} />
                    <LiquidMaterial
                      color={i % 2 === 0 ? palette.accent : palette.metal}
                      opacity={0.72}
                    />
                  </mesh>
                  <mesh position={[0, 0.34, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.08, 18]} />
                    <meshStandardMaterial color={palette.dark} roughness={0.4} metalness={0.6} />
                  </mesh>
                </group>
              </group>
            );
          })}
        </group>
      </Spin>
      <mesh position={[0, -0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.58, 0.055, 12, 64]} />
        <meshStandardMaterial color={palette.glass} roughness={0.25} metalness={0.35} />
      </mesh>
      <mesh position={[0, -1.02, 1.9]}>
        <boxGeometry args={[1.1, 0.26, 0.08]} />
        <meshStandardMaterial color={palette.dark} roughness={0.4} metalness={0.5} />
      </mesh>
      {[-0.28, 0, 0.28].map((x, i) => (
        <mesh key={x} position={[x, -1.02, 1.95]}>
          <cylinderGeometry args={[0.055, 0.055, 0.06, 16]} />
          <meshStandardMaterial
            color={i === 1 ? palette.accent : palette.metal}
            emissive={i === 1 ? palette.accent : palette.metal}
            emissiveIntensity={0.25}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}


export default function LabDiagram({
  variant = "molecule",
}: {
  variant?: LabDiagramVariant;
}) {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const palette = useScenePalette();

  // Standalone components each mount their own Canvas — render directly
  // without the outer Canvas wrapper to avoid nested Canvas.
  if (variant === "flask") return <LabFlask />;
  if (variant === "slide") return <MicroscopeSlide />;
  if (variant === "mitosis") return <CellMitosis />;
  if (variant === "distillation") return <LabDistillation />;

  return (
    <Canvas
      dpr={[1, isDesktop ? 1.5 : 1.1]}
      camera={{ position: [0, 0.45, 6.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.82} />
      <directionalLight position={[3, 4, 3]} intensity={0.62} color={palette.glass} />
      <pointLight position={[-3, -1, 3]} intensity={0.55} color={palette.accent} />
      <Float
        speed={reduced ? 0 : 1.15}
        rotationIntensity={reduced ? 0 : 0.12}
        floatIntensity={reduced ? 0 : 0.32}
      >
        {variant === "molecule" && <Molecule palette={palette} reduced={reduced} />}
        {variant === "centrifuge" && <Centrifuge palette={palette} reduced={reduced} />}
      </Float>
    </Canvas>
  );
}
