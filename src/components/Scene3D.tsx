import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

const FloatingShapes = () => {
  const group = useRef<THREE.Group>(null)

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={group}>
      {/* Box */}
      <mesh
        position={[-2, 0, 0]}
        rotation={[0.5, 0.5, 0]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          args={[
            {
              color: '#4299e1',
              metalness: 0.8,
              roughness: 0.2
            }
          ]}
        />
      </mesh>

      {/* Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial
          args={[
            {
              color: '#9f7aea',
              metalness: 0.8,
              roughness: 0.2
            }
          ]}
        />
      </mesh>

      {/* Rotated Box */}
      <mesh
        position={[2, 0, 0]}
        rotation={[1, 1, 0]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          args={[
            {
              color: '#38b2ac',
              metalness: 0.8,
              roughness: 0.2
            }
          ]}
        />
      </mesh>
    </group>
  )
}

const Scene3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight args={[undefined, 0.5]} />

        <pointLight
          args={[undefined, 1, undefined]}
          position={[10, 10, 10]}
        />

        <pointLight
          args={[undefined, 0.5, undefined]}
          position={[-10, -10, -10]}
        />

        <FloatingShapes />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}

export default Scene3D
