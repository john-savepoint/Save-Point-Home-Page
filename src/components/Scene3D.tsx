import { Canvas } from '@react-three/fiber'
import { OrbitControls, useDetectGPU } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'

const FloatingShapes = () => {
  const group = useRef<THREE.Group>(null)
  const gpuTier = useDetectGPU()
  const startTime = useMemo(() => Date.now(), [])

  // Optimize geometry based on GPU capability
  const sphereSegments = useMemo(() => (gpuTier.tier < 2 ? 16 : 32), [gpuTier.tier])

  useFrame(() => {
    if (group.current) {
      // Make rotation framerate-independent
      const elapsedTime = (Date.now() - startTime) / 1000
      group.current.rotation.y = elapsedTime * 0.5
    }
  })

  const materials = useMemo(
    () => ({
      box: new THREE.MeshStandardMaterial({
        color: '#4299e1',
        metalness: 0.8,
        roughness: 0.2
      }),
      sphere: new THREE.MeshStandardMaterial({
        color: '#9f7aea',
        metalness: 0.8,
        roughness: 0.2
      }),
      rotatedBox: new THREE.MeshStandardMaterial({
        color: '#38b2ac',
        metalness: 0.8,
        roughness: 0.2
      })
    }),
    []
  )

  const geometries = useMemo(
    () => ({
      box: new THREE.BoxGeometry(1, 1, 1),
      sphere: new THREE.SphereGeometry(0.75, sphereSegments, sphereSegments)
    }),
    [sphereSegments]
  )

  return (
    <group ref={group}>
      <mesh
        position={[-2, 0, 0]}
        rotation={[0.5, 0.5, 0]}
        geometry={geometries.box}
        material={materials.box}
      />

      <mesh
        position={[0, 0, 0]}
        geometry={geometries.sphere}
        material={materials.sphere}
      />

      <mesh
        position={[2, 0, 0]}
        rotation={[1, 1, 0]}
        geometry={geometries.box}
        material={materials.rotatedBox}
      />
    </group>
  )
}

const Scene3D = () => {
  const gpuTier = useDetectGPU()

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, gpuTier.tier < 2 ? 1.5 : 2]} // Limit DPR on lower-end devices
        performance={{ min: 0.5 }} // Allow frame dropping on mobile
      >
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
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}

export default Scene3D
