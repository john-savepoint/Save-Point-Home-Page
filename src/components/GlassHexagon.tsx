import { Canvas, useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'

// Enhanced glass shader with stronger refraction
const GlassMaterial = shaderMaterial(
  {
    time: 0,
    distortion: 0.5,
    radius: 0.7,
    thickness: 0.05,
    opacity: 0.3,
    refractionRatio: 0.8
  },
  // Vertex shader
  `
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vViewPosition;
    void main() {
      vPosition = position;
      vNormal = normal;
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader with enhanced refraction
  `
    uniform float time;
    uniform float distortion;
    uniform float radius;
    uniform float thickness;
    uniform float opacity;
    uniform float refractionRatio;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vViewPosition;

    void main() {
      // Calculate distance from center
      float dist = length(vPosition.xy);
      
      // Create hollow effect
      float hollow = smoothstep(radius - thickness, radius, dist) * 
                    (1.0 - smoothstep(radius, radius + thickness, dist));
      
      // Enhanced Fresnel effect
      vec3 viewDirection = normalize(vViewPosition);
      float fresnel = pow(1.0 + dot(viewDirection, vNormal), 5.0);
      
      // Dynamic refraction
      vec3 refraction = refract(viewDirection, normalize(vNormal), refractionRatio);
      
      // Combine effects with enhanced color
      vec3 color = mix(
        vec3(0.6, 0.8, 1.0), // Base glass color
        vec3(1.0), // Highlight color
        fresnel * 0.7 + abs(refraction.x) * 0.3
      );
      
      // Add iridescence based on viewing angle
      float iridescence = sin(fresnel * 3.14159 + time * 0.5) * 0.15;
      color += vec3(iridescence, iridescence * 0.8, iridescence * 1.2);
      
      gl_FragColor = vec4(color, hollow * opacity + fresnel * 0.2);
    }
  `
)

extend({ GlassMaterial })

interface HexagonProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  isAnimated?: boolean
  opacity?: number
}

const HexagonShape = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  isAnimated = false,
  opacity = 0.3
}: HexagonProps) => {
  const materialRef = useRef<any>()
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime
    }
    if (meshRef.current && isAnimated) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  // Create hexagon shape
  const hexagonPoints = []
  const segments = 6
  const radius = 4 * scale
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    hexagonPoints.push(new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius))
  }
  const hexagonShape = new THREE.Shape(hexagonPoints)
  const innerRadius = radius * 0.7
  const holePoints = []
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    holePoints.push(new THREE.Vector2(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius))
  }
  hexagonShape.holes.push(new THREE.Path(holePoints))

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
    >
      <extrudeGeometry
        args={[
          hexagonShape,
          {
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 3
          }
        ]}
      />
      {/* @ts-ignore */}
      <glassMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={opacity}
        refractionRatio={0.8}
      />
    </mesh>
  )
}

const GlassHexagon = () => {
  // Define static hexagons with different positions, rotations, and scales
  const staticHexagons = [
    { position: [-5, -3, 0], rotation: [Math.PI / 3, Math.PI / 6, 0], scale: 0.3 },
    { position: [4, -2, 0], rotation: [Math.PI / 4, -Math.PI / 4, 0], scale: 0.4 },
    { position: [-3, 2, 0], rotation: [-Math.PI / 6, Math.PI / 3, 0], scale: 0.25 },
    { position: [3, 3, 0], rotation: [Math.PI / 2, Math.PI / 4, 0], scale: 0.35 },
    { position: [0, -4, 0], rotation: [-Math.PI / 4, -Math.PI / 6, 0], scale: 0.3 }
  ]

  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Large rotating hexagon */}
        <HexagonShape
          position={[8, 0, 0]}
          scale={2}
          isAnimated={true}
          opacity={0.4}
        />

        {/* Static background hexagons */}
        {staticHexagons.map((hex, index) => (
          <HexagonShape
            key={index}
            position={hex.position as [number, number, number]}
            rotation={hex.rotation as [number, number, number]}
            scale={hex.scale}
            opacity={0.2}
          />
        ))}
      </Canvas>
    </div>
  )
}

export default GlassHexagon
