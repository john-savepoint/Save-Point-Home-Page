import { Canvas, useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'

const GlassMaterial = shaderMaterial(
  {
    time: 0,
    distortion: 0.4,
    radius: 1,
    thickness: 0.1,
    opacity: 0.2,
    distortionScale: 0.3,
    temporalDistortion: 0.2
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    varying vec2 vScreenSpace;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vec4 mvPosition = viewMatrix * worldPosition;
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
      vScreenSpace = gl_Position.xy / gl_Position.w;
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform float distortion;
    uniform float distortionScale;
    uniform float temporalDistortion;
    uniform float opacity;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vViewPosition;
    varying vec2 vScreenSpace;
    
    float fresnel(vec3 eye, vec3 normal) {
      return pow(1.0 - clamp(dot(eye, normal), 0.0, 1.0), 3.0);
    }
    
    vec3 getNoise(vec2 uv) {
      float t = time * temporalDistortion;
      vec2 noiseUV = uv * distortionScale + vec2(sin(t), cos(t)) * 0.1;
      float angle = (noiseUV.x + noiseUV.y) * 10.0 + t;
      float s = sin(angle);
      float c = cos(angle);
      mat2 rotationMatrix = mat2(c, -s, s, c);
      noiseUV = rotationMatrix * noiseUV;
      
      return vec3(
        sin(noiseUV.x * 10.0 + t) * 0.5 + 0.5,
        sin(noiseUV.y * 12.0 - t) * 0.5 + 0.5,
        sin((noiseUV.x + noiseUV.y) * 11.0 + t) * 0.5 + 0.5
      );
    }
    
    void main() {
      vec3 viewDirection = normalize(vViewPosition);
      float fresnelTerm = fresnel(viewDirection, vNormal);
      
      vec2 distortedUV = vScreenSpace + vNormal.xy * distortion * fresnelTerm;
      vec3 noise = getNoise(distortedUV);
      
      vec3 color = mix(
        vec3(0.95, 0.98, 1.0), // Base color (slight blue tint)
        vec3(1.0), // Highlight color
        noise * fresnelTerm
      );
      
      float alpha = mix(0.1, opacity, fresnelTerm * 0.5 + 0.2);
      alpha *= smoothstep(0.4, 0.5, noise.x);
      
      gl_FragColor = vec4(color, alpha);
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
  rotationSpeed?: number
  thickness?: number
  bevelSize?: number
}

const HexagonShape = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  isAnimated = false,
  opacity = 0.2,
  rotationSpeed = 0.2,
  thickness = 0.2,
  bevelSize = 0.1
}: HexagonProps) => {
  const materialRef = useRef<any>()
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime
    }
    if (meshRef.current && isAnimated) {
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
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
            depth: thickness,
            bevelEnabled: true,
            bevelThickness: thickness * 0.5,
            bevelSize: bevelSize,
            bevelSegments: 6
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
        distortion={0.4}
        distortionScale={0.3}
        temporalDistortion={0.2}
      />
    </mesh>
  )
}

const GlassHexagon = () => {
  const staticHexagons = [
    { position: [-5, -3, -10], rotation: [Math.PI / 3, Math.PI / 6, 0], scale: 0.3 },
    { position: [4, -2, -10], rotation: [Math.PI / 4, -Math.PI / 4, 0], scale: 0.4 },
    { position: [-3, 2, -10], rotation: [-Math.PI / 6, Math.PI / 3, 0], scale: 0.25 },
    { position: [3, 3, -10], rotation: [Math.PI / 2, Math.PI / 4, 0], scale: 0.35 },
    { position: [0, -4, -10], rotation: [-Math.PI / 4, -Math.PI / 6, 0], scale: 0.3 }
  ]

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          stencil: false,
          depth: false
        }}
      >
        {/* Large rotating hexagon */}
        <HexagonShape
          position={[8, 0, 5]}
          scale={2.5}
          isAnimated={true}
          opacity={0.3}
          rotationSpeed={0.2}
          thickness={0.4}
          bevelSize={0.2}
        />

        {/* Static background hexagons */}
        {staticHexagons.map((hex, index) => (
          <HexagonShape
            key={index}
            position={hex.position as [number, number, number]}
            rotation={hex.rotation as [number, number, number]}
            scale={hex.scale}
            opacity={0.15}
            isAnimated={true}
            rotationSpeed={0.05}
          />
        ))}
      </Canvas>
    </div>
  )
}

export default GlassHexagon
