import { useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Instance, Instances } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScenePalette, type ScenePalette } from "@/hooks/useScenePalette";

export type LabDiagramVariant =
  | "glassware"
  | "microscope"
  | "molecule"
  | "microplate"
  | "centrifuge"
  | "petri";

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

function Bubbles({ color, reduced }: { color: string; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const bubbles = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const angle = i * 2.4;
        const radius = 0.12 + (i % 4) * 0.09;
        return {
          position: [
            Math.cos(angle) * radius,
            -0.62 + (i / 9) * 0.7,
            Math.sin(angle) * radius * 0.7,
          ] as Vec3,
          size: 0.025 + (i % 3) * 0.012,
        };
      }),
    [],
  );

  useFrame((state) => {
    if (ref.current && !reduced) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {bubbles.map((bubble, i) => (
        <mesh key={i} position={bubble.position}>
          <sphereGeometry args={[bubble.size, 10, 10]} />
          <meshBasicMaterial color={color} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Glassware({ palette, reduced }: { palette: ScenePalette; reduced: boolean }) {
  return (
    <group position={[0, -0.15, 0]} rotation={[0.04, -0.34, 0]}>
      <mesh position={[0, -1.55, 0]}>
        <cylinderGeometry args={[2.3, 2.35, 0.14, 64]} />
        <meshStandardMaterial color={palette.surface} roughness={0.75} metalness={0.12} />
      </mesh>
      <mesh position={[0, -1.46, 0]}>
        <torusGeometry args={[2.28, 0.018, 8, 64]} />
        <meshBasicMaterial color={palette.metal} transparent opacity={0.35} />
      </mesh>

      <group position={[-0.72, -0.6, 0]}>
        <mesh position={[0, -0.15, 0]}>
          <coneGeometry args={[0.76, 1.32, 48, 1, true]} />
          <GlassMaterial color={palette.glass} opacity={0.2} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.2, 0.27, 0.62, 32, 1, true]} />
          <GlassMaterial color={palette.glass} opacity={0.2} />
        </mesh>
        <mesh position={[0, 1.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.03, 12, 32]} />
          <GlassMaterial color={palette.glass} opacity={0.34} />
        </mesh>
        <mesh position={[0, -0.48, 0]}>
          <cylinderGeometry args={[0.4, 0.62, 0.58, 48]} />
          <LiquidMaterial color={palette.accent} opacity={0.5} />
        </mesh>
        <Bubbles color={palette.glass} reduced={reduced} />
      </group>

      <group position={[1.08, -0.98, 0]}>
        <mesh>
          <cylinderGeometry args={[0.62, 0.58, 1.02, 48, 1, true]} />
          <GlassMaterial color={palette.glass} opacity={0.18} />
        </mesh>
        <mesh position={[0, 0.52, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.6, 0.032, 12, 48]} />
          <GlassMaterial color={palette.glass} opacity={0.34} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.55, 0.53, 0.52, 48]} />
          <LiquidMaterial color={palette.metal} opacity={0.38} />
        </mesh>
        {[-0.08, 0.08, 0.24].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.585, 0.008, 6, 48]} />
            <meshBasicMaterial color={palette.glass} transparent opacity={0.45} />
          </mesh>
        ))}
      </group>

      <group position={[1.62, -0.92, -0.4]} rotation={[0, 0, -0.08]}>
        <mesh position={[0, -0.31, 0]}>
          <boxGeometry args={[1.1, 0.05, 0.42]} />
          <meshStandardMaterial color={palette.metal} roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[1.1, 0.05, 0.42]} />
          <meshStandardMaterial color={palette.metal} roughness={0.4} metalness={0.6} />
        </mesh>
        {[-0.38, 0, 0.38].map((x, i) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.1, 0.1, 0.96, 20, 1, true]} />
              <GlassMaterial color={palette.glass} opacity={0.24} />
            </mesh>
            <mesh position={[0, -0.28, 0]}>
              <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
              <GlassMaterial color={palette.glass} opacity={0.24} />
            </mesh>
            <mesh position={[0, -0.34, 0]}>
              <cylinderGeometry args={[0.075, 0.075, 0.34, 16]} />
              <LiquidMaterial color={i === 1 ? palette.accent : palette.metal} opacity={0.55} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function Microscope({ palette }: { palette: ScenePalette }) {
  return (
    <group position={[0, -0.1, 0]} rotation={[0.06, -0.44, 0]}>
      <mesh position={[0, -1.55, 0]}>
        <cylinderGeometry args={[1.35, 1.5, 0.28, 48]} />
        <meshStandardMaterial color={palette.metal} roughness={0.34} metalness={0.72} />
      </mesh>
      <mesh position={[0, -0.55, -0.2]}>
        <boxGeometry args={[0.36, 1.75, 0.44]} />
        <meshStandardMaterial color={palette.metal} roughness={0.38} metalness={0.68} />
      </mesh>
      <mesh position={[0, 0.62, -0.32]} rotation={[0, 0, 0.38]}>
        <cylinderGeometry args={[0.2, 0.24, 1.55, 24]} />
        <meshStandardMaterial color={palette.metal} roughness={0.35} metalness={0.7} />
      </mesh>
      <mesh position={[0.08, 1.38, 0.1]}>
        <boxGeometry args={[1.22, 0.52, 0.64]} />
        <meshStandardMaterial color={palette.dark} roughness={0.4} metalness={0.55} />
      </mesh>
      <mesh position={[0.38, 1.9, 0.1]} rotation={[0, 0, -0.38]}>
        <cylinderGeometry args={[0.19, 0.23, 0.72, 24]} />
        <meshStandardMaterial color={palette.dark} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0.58, 2.2, 0.1]} rotation={[0, 0, -0.38]}>
        <cylinderGeometry args={[0.15, 0.18, 0.18, 24]} />
        <GlassMaterial color={palette.glass} opacity={0.42} />
      </mesh>
      <mesh position={[0, 1.02, 0.34]}>
        <cylinderGeometry args={[0.34, 0.34, 0.22, 32]} />
        <meshStandardMaterial color={palette.metal} roughness={0.36} metalness={0.7} />
      </mesh>
      {[-0.18, 0, 0.18].map((x) => (
        <mesh key={x} position={[x, 0.78, 0.38]}>
          <cylinderGeometry args={[0.09, 0.12, 0.42, 20]} />
          <meshStandardMaterial color={palette.dark} roughness={0.3} metalness={0.65} />
        </mesh>
      ))}
      <mesh position={[0, 0.55, 0.42]}>
        <boxGeometry args={[1.32, 0.12, 0.9]} />
        <meshStandardMaterial color={palette.metal} roughness={0.42} metalness={0.65} />
      </mesh>
      <mesh position={[0, 0.64, 0.44]}>
        <boxGeometry args={[0.72, 0.035, 0.38]} />
        <GlassMaterial color={palette.glass} opacity={0.4} />
      </mesh>
      <mesh position={[0, 0.68, 0.44]}>
        <sphereGeometry args={[0.075, 18, 18]} />
        <meshStandardMaterial
          color={palette.accent}
          emissive={palette.accent}
          emissiveIntensity={0.55}
          roughness={0.3}
        />
      </mesh>
      {[-0.72, 0.72].map((x) => (
        <mesh key={x} position={[x, 0.08, 0.18]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
          <meshStandardMaterial color={palette.dark} roughness={0.34} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
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

function Microplate({ palette }: { palette: ScenePalette }) {
  const wells = useMemo(() => {
    const result: Vec3[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 12; col++) {
        result.push([-1.84 + col * 0.335, -0.32, -1.12 + row * 0.32]);
      }
    }
    return result;
  }, []);

  const filled = useMemo(() => new Set([3, 14, 27, 38, 51, 62, 75, 88]), []);

  return (
    <group position={[0, -0.1, 0]} rotation={[0.1, -0.28, 0]}>
      <mesh position={[0, -0.52, 0]}>
        <boxGeometry args={[4.5, 0.24, 3.0]} />
        <meshStandardMaterial color={palette.surface} roughness={0.52} metalness={0.16} />
      </mesh>
      <mesh position={[0, -0.39, 0]}>
        <boxGeometry args={[4.24, 0.06, 2.74]} />
        <meshStandardMaterial color={palette.metal} roughness={0.4} metalness={0.3} />
      </mesh>
      <Instances limit={96} range={96}>
        <cylinderGeometry args={[0.105, 0.105, 0.18, 12]} />
        <meshStandardMaterial color={palette.glass} roughness={0.35} metalness={0.18} />
        {wells.map((position, i) => (
          <Instance key={i} position={position} />
        ))}
      </Instances>
      {wells.map((position, i) =>
        filled.has(i) ? (
          <mesh key={`fill-${i}`} position={[position[0], -0.36, position[2]]}>
            <cylinderGeometry args={[0.082, 0.082, 0.09, 12]} />
            <LiquidMaterial
              color={i % 3 === 0 ? palette.accent : palette.metal}
              opacity={0.82}
            />
          </mesh>
        ) : null,
      )}
      <group position={[1.05, 1.08, 0.55]} rotation={[0, 0, -0.16]}>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 1.05, 20]} />
          <meshStandardMaterial color={palette.metal} roughness={0.35} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.24, 20]} />
          <meshStandardMaterial color={palette.dark} roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, -0.42, 0]}>
          <coneGeometry args={[0.1, 0.55, 20, 1, true]} />
          <GlassMaterial color={palette.glass} opacity={0.34} />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.22, 10]} />
          <meshStandardMaterial color={palette.accent} metalness={0.4} roughness={0.3} />
        </mesh>
      </group>
    </group>
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

function Colonies({ palette, reduced }: { palette: ScenePalette; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const colonies = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const angle = i * 2.18;
        const radius = 0.18 + ((i * 0.37) % 1.05);
        return {
          position: [
            Math.cos(angle) * radius,
            -0.39,
            Math.sin(angle) * radius,
          ] as Vec3,
          size: 0.075 + (i % 4) * 0.022,
          color: i % 3 === 0 ? palette.accent : i % 3 === 1 ? palette.metal : palette.glass,
        };
      }),
    [palette.accent, palette.glass, palette.metal],
  );

  useFrame((state) => {
    if (ref.current && !reduced) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.012;
      ref.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={ref}>
      {colonies.map((colony, i) => (
        <mesh key={i} position={colony.position}>
          <sphereGeometry args={[colony.size, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color={colony.color}
            emissive={colony.color}
            emissiveIntensity={0.12}
            roughness={0.42}
            metalness={0.18}
          />
        </mesh>
      ))}
    </group>
  );
}

function Petri({ palette, reduced }: { palette: ScenePalette; reduced: boolean }) {
  return (
    <group position={[0, -0.15, 0]} rotation={[0.16, -0.32, 0]}>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[1.72, 1.76, 0.26, 64, 1, true]} />
        <GlassMaterial color={palette.glass} opacity={0.24} />
      </mesh>
      <mesh position={[0, -0.82, 0]}>
        <cylinderGeometry args={[1.7, 1.7, 0.06, 64]} />
        <GlassMaterial color={palette.glass} opacity={0.32} />
      </mesh>
      <mesh position={[0, -0.54, 0]}>
        <cylinderGeometry args={[1.56, 1.56, 0.16, 64]} />
        <meshStandardMaterial color={palette.surface} roughness={0.62} metalness={0.08} />
      </mesh>
      <mesh position={[0, -0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.72, 0.03, 10, 64]} />
        <GlassMaterial color={palette.glass} opacity={0.38} />
      </mesh>
      <Colonies palette={palette} reduced={reduced} />
      <group position={[0, 0.58, -0.34]} rotation={[0.36, 0, -0.08]}>
        <mesh>
          <cylinderGeometry args={[1.8, 1.8, 0.14, 64, 1, true]} />
          <GlassMaterial color={palette.glass} opacity={0.18} />
        </mesh>
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.035, 10, 64]} />
          <GlassMaterial color={palette.glass} opacity={0.34} />
        </mesh>
      </group>
      <group position={[2.0, -0.86, 0.55]} rotation={[0, 0, 0.08]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.028, 0.028, 1.3, 12]} />
          <meshStandardMaterial color={palette.metal} roughness={0.35} metalness={0.6} />
        </mesh>
        <mesh position={[0.7, 0, 0]}>
          <torusGeometry args={[0.16, 0.018, 8, 28]} />
          <meshStandardMaterial color={palette.metal} roughness={0.35} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function LabDiagram({
  variant = "glassware",
}: {
  variant?: LabDiagramVariant;
}) {
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const palette = useScenePalette();

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
        {variant === "glassware" && <Glassware palette={palette} reduced={reduced} />}
        {variant === "microscope" && <Microscope palette={palette} />}
        {variant === "molecule" && <Molecule palette={palette} reduced={reduced} />}
        {variant === "microplate" && <Microplate palette={palette} />}
        {variant === "centrifuge" && <Centrifuge palette={palette} reduced={reduced} />}
        {variant === "petri" && <Petri palette={palette} reduced={reduced} />}
      </Float>
    </Canvas>
  );
}
