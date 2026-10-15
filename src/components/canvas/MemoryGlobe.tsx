"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  image: string;
  lat: number;
  lng: number;
  tag: string;
}

// Convert Lat/Lng to 3D Cartesian coordinates on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Procedural Dot-Matrix Landmass Sphere
function DotMatrixSphere({ radius = 2.4 }: { radius?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const coords: number[] = [];
    const cols: number[] = [];
    const count = 3200;
    const baseColor = new THREE.Color("#EDE8DF");
    const goldColor = new THREE.Color("#C9A96E");

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution for uniform dot matrix
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = 0.1 * i * Math.PI;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Filter pseudo-landmass clusters
      const lat = Math.asin(y) * (180 / Math.PI);
      const lng = Math.atan2(z, x) * (180 / Math.PI);
      
      // Keep structured regions (resembling continents)
      const isLand =
        (lat > -10 && lat < 55 && lng > -20 && lng < 140) || // Eurasia/Africa
        (lat > -50 && lat < 60 && lng > -130 && lng < -30) || // Americas
        (lat > -40 && lat < -10 && lng > 110 && lng < 160); // Oceania

      if (isLand || Math.random() < 0.18) {
        coords.push(x * radius, y * radius, z * radius);
        const col = Math.random() < 0.08 ? goldColor : baseColor;
        cols.push(col.r, col.g, col.b);
      }
    }

    return {
      positions: new Float32Array(coords),
      colors: new Float32Array(cols),
    };
  }, [radius]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.045; // Slow deliberate auto-rotation
    }
  });

  return (
    <group>
      {/* Delicate Inner Wireframe Rim */}
      <mesh>
        <sphereGeometry args={[radius * 0.99, 32, 32]} />
        <meshBasicMaterial
          color="#0A0A0B"
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Atmospheric Rim Glow Halo */}
      <mesh>
        <sphereGeometry args={[radius * 1.03, 32, 32]} />
        <meshBasicMaterial
          color="#C9A96E"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* The Dot Matrix Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Floating Treated Photo Badge
function FloatingPhotoPin({
  photo,
  radius,
  onSelect,
}: {
  photo: MemoryPhoto;
  radius: number;
  onSelect: (p: MemoryPhoto) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const position = useMemo(
    () => latLngToVector3(photo.lat, photo.lng, radius * 1.08),
    [photo.lat, photo.lng, radius]
  );

  return (
    <group position={position}>
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Html
          center
          distanceFactor={6}
          transform={false}
          className="pointer-events-auto"
        >
          <div
            onClick={() => onSelect(photo)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            data-cursor="VIEW"
            className="group cursor-pointer select-none transition-transform duration-300 hover:scale-110"
          >
            {/* Minimal Treated Card */}
            <div
              className={`relative h-16 w-24 overflow-hidden border bg-ink p-0.5 shadow-2xl transition-all duration-500 ${
                hovered
                  ? "border-gold shadow-gold/20"
                  : "border-border shadow-black/80"
              }`}
            >
              <div
                className="relative h-full w-full transition-all duration-500"
                style={{
                  filter: hovered
                    ? "grayscale(0%) contrast(100%)"
                    : "grayscale(100%) contrast(140%)",
                }}
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  sizes="120px"
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Halftone Dot Overlay */}
              <div
                className="pointer-events-none absolute inset-0 bg-dot-matrix-fine opacity-40 mix-blend-overlay"
                aria-hidden="true"
              />

              {/* Micro badge pin */}
              <div className="absolute bottom-0.5 left-0.5 font-mono text-[7px] text-ivory/80 uppercase tracking-tighter">
                {photo.tag.split(" ")[0]}
              </div>
            </div>

            {/* Anchor stem line */}
            <div className="mx-auto h-2 w-[1px] bg-gold/50" />
            <div className="mx-auto h-1 w-1 rounded-full bg-gold" />
          </div>
        </Html>
      </Billboard>
    </group>
  );
}

// Scene Root with dynamic interaction
function GlobeScene({
  photos,
  onSelectPhoto,
}: {
  photos: MemoryPhoto[];
  onSelectPhoto: (p: MemoryPhoto) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.035;
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#EDE8DF" />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#C9A96E" />

      <group ref={groupRef}>
        <DotMatrixSphere radius={2.35} />
        {photos.map((p) => (
          <FloatingPhotoPin
            key={p.id}
            photo={p}
            radius={2.35}
            onSelect={onSelectPhoto}
          />
        ))}
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate={false}
        dampingFactor={0.05}
      />
    </>
  );
}

export default function MemoryGlobe({
  photos,
  onSelectPhoto,
}: {
  photos: MemoryPhoto[];
  onSelectPhoto: (p: MemoryPhoto) => void;
}) {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-ink">
        <div className="relative h-72 w-72 rounded-full border border-border bg-dot-matrix p-8 flex flex-col items-center justify-center text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-gold mb-2">
            DJSMUN '26 ARCHIVE
          </div>
          <p className="font-serif text-sm text-smoke">
            Interactive Dot Matrix Sphere
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-[480px] sm:h-[580px] md:h-[680px] w-full cursor-grab active:cursor-grabbing"
      data-cursor="DRAG"
    >
      <Canvas
        camera={{ position: [0, 0.4, 5.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <GlobeScene photos={photos} onSelectPhoto={onSelectPhoto} />
      </Canvas>

      {/* Rim Coordinates Badge */}
      <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-[0.2em] text-smoke/70">
        LAT: 19.1075° N // LNG: 72.8368° E // 3D MEMORY REPOSITORY
      </div>
    </div>
  );
}
