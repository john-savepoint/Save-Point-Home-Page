import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Sphere, Box, OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'
import type { RootState } from '@react-three/fiber'

const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state: RootState) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <Box
          args={[1, 1, 1]}
          position={[-2, 0, 0]}
        >
          <meshStandardMaterial
            color="#4338ca"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </Float>

      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <Sphere
          args={[0.7, 32, 32]}
          position={[2, 0, 0]}
        >
          <meshStandardMaterial
            color="#7e22ce"
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
      </Float>

      <Float
        speed={1.2}
        rotationIntensity={0.3}
        floatIntensity={0.3}
      >
        <Box
          args={[0.8, 0.8, 0.8]}
          position={[0, 2, 0]}
          rotation={[Math.PI / 4, Math.PI / 4, 0]}
        >
          <meshStandardMaterial
            color="#0ea5e9"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
      </Float>
    </group>
  )
}

const Scene3D = () => {
  return (
    <div className="h-[600px] w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color
          attach="background"
          args={['#000000']}
        />
        <ambientLight intensity={0.5} />
        <pointLight
          position={[10, 10, 10]}
          intensity={1}
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
        />

        <FloatingShapes />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  )
}

export default Scene3D
