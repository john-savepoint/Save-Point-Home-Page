import { Canvas, useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'

// Custom shader material for glass effect
const GlassMaterial = shaderMaterial(
  {
    time: 0,
    distortion: 0.5,
    radius: 0.7,
    thickness: 0.05
  },
  // Vertex shader
  `
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vPosition = position;
      vNormal = normal;
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform float distortion;
    uniform float radius;
    uniform float thickness;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;

    void main() {
      // Calculate distance from center
      float dist = length(vPosition.xy);
      
      // Create hollow effect
      float hollow = smoothstep(radius - thickness, radius, dist) * 
                    (1.0 - smoothstep(radius, radius + thickness, dist));
      
      // Fresnel effect for glass-like appearance
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 + dot(viewDirection, vNormal), 3.0);
      
      // Combine effects
      vec3 color = mix(
        vec3(0.6, 0.8, 1.0), // Base glass color
        vec3(1.0), // Highlight color
        fresnel * 0.5
      );
      
      // Add some iridescence
      color += vec3(sin(time * 0.5) * 0.1, cos(time * 0.3) * 0.1, sin(time * 0.7) * 0.1);
      
      gl_FragColor = vec4(color, hollow * 0.5 + fresnel * 0.3);
    }
  `
)

extend({ GlassMaterial })

const HexagonShape = () => {
  const materialRef = useRef<any>()
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  // Create hexagon shape
  const hexagonPoints = []
  const segments = 6
  const radius = 4
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
      rotation={[Math.PI / 2, 0, 0]}
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
      />
    </mesh>
  )
}

const GlassHexagon = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <HexagonShape />
      </Canvas>
    </div>
  )
}

export default GlassHexagon
