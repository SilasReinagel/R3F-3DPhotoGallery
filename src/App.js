import * as THREE from 'three'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, Image, RoundedBox, Environment } from '@react-three/drei'

const GOLDENRATIO = 1.61803398875

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const [clicked, click] = useState(null)
  useEffect(() => {
    if (clicked) {
      clicked.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, delta) => {
    state.camera.position.lerp(p, delta * 4)
    state.camera.quaternion.slerp(q, delta * 4)
  })
  return (
    <group onClick={(e) => (e.stopPropagation(), click(clicked === e.object ? null : e.object))} onPointerMissed={(e) => click(null)}>
      <Frame url={images[0]} position={[0, 0, 1.25]} />
      <Frame position={[-0.8, 0, -0.5]} url={images[1]} />
      <Frame position={[0.8, 0, -0.5]} url={images[2]} />
      <Frame position={[-1.75, 0, 1]} rotation-y={Math.PI / 2.5} url={images[3]} />
      <Frame position={[-2.2, 0, 2.5]} rotation-y={Math.PI / 2.5} url={images[4]} />
      <Frame position={[1.75, 0, 1]} rotation-y={-Math.PI / 2.5} url={images[5]} />
      <Frame position={[2.2, 0, 2.5]} rotation-y={-Math.PI / 2.5} url={images[6]} />
    </group>
  )
}

export default function App({ images }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 0, 100] }}>
      <Suspense fallback={null}>
        <color attach="background" args={['#191920']} />
        <fog attach="fog" args={['#191920', 0, 10]} />
        <Environment preset="city" />
        <group position={[0, -0.5, 0]}>
          <Frames images={images} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024} // Lower value if too slow on mobile
              mixBlur={1}
              mixStrength={60}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#151515"
              metalness={0.5}
            />
          </mesh>
        </group>
      </Suspense>
    </Canvas>
  )
}

function Frame({ url, ...props }) {
  const [rnd] = useState(() => Math.random())
  const image = useRef()
  const ref = useRef()
  useFrame((state) => {
    image.current.material.zoom = 2 + Math.sin(rnd * 1000 + state.clock.elapsedTime / 3) / 2
  })
  return (
    <group ref={ref} {...props}>
      <RoundedBox radius={0.01} smoothness={4} scale={[1, GOLDENRATIO, 0.05]} position={[0, GOLDENRATIO / 2, 0]}>
        <meshStandardMaterial color="#151515" metalness={0.8} roughness={0.5} envMapIntensity={2} />
        <mesh raycast={() => null} scale={[0.9, 0.89, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial color="white" toneMapped={false} />
        </mesh>
        <Image raycast={() => null} ref={image} scale={0.875} position={[0, 0, 0.7]} url={url} />
      </RoundedBox>
    </group>
  )
}
