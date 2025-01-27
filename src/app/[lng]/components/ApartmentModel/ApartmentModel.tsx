/* eslint-disable react/no-unknown-property */

'use client';

import { useRef, useState } from 'react';
import {
  Scroll,
  ScrollControls,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

import type * as THREE from 'three';
import type IApartmentModel from './interfaces/IApartmentModel';

import {
  BUBBLE_PATH, BUBBLE_SYM_PATH, MODEL_PATH, TEXT_PATH, TEXT2_PATH,
  TEXTURE_TOOLTIP_PATH,
  TEXTURE_TOOLTIP2_PATH,
} from '@/constants/constants';

function ApartmentModel({ tablet, mobile }:IApartmentModel) {
  const data = useGLTF(MODEL_PATH);
  const texture = useTexture(BUBBLE_PATH);
  const textureSym = useTexture(BUBBLE_SYM_PATH);
  const texture2 = useTexture(TEXTURE_TOOLTIP_PATH);
  const texture3 = useTexture(TEXTURE_TOOLTIP2_PATH);
  const text = useTexture(TEXT_PATH);
  const text2 = useTexture(TEXT2_PATH);
  const imageRef = useRef<THREE.Mesh>(null);
  const imageRef2 = useRef<THREE.Mesh>(null);
  const imageSymRef = useRef<THREE.Mesh>(null);
  const imageSymRef2 = useRef<THREE.Mesh>(null);
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);
  const [openTooltip2, setOpenTooltip2] = useState<boolean>(false);
  const [targetRotation1, setTargetRotation1] = useState(0);
  const [targetRotation2, setTargetRotation2] = useState(0);

  const getPages = () => {
    const pages = 6.5;
    if (tablet) {
      return pages * 2;
    }
    if (mobile) {
      return pages * 2.5;
    }
    return pages;
  };

  const onHandleClickBubble1 = () => {
    setOpenTooltip(!openTooltip);
  };

  const onHandleClickBubble2 = () => {
    setOpenTooltip2(!openTooltip2);
  };

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (imageRef.current) {
      imageRef.current.position.y = 1.1 + Math.sin(time) * 0.06;
      imageRef.current.rotation.z = MathUtils.lerp(
        imageRef.current.rotation.z,
        targetRotation1,
        0.1,
      );
    }
    if (imageSymRef.current) {
      imageSymRef.current.position.y = 1.1 + Math.sin(time) * 0.06;
    }
    if (imageRef2.current) {
      imageRef2.current.position.y = 2.2 + Math.cos(time) * 0.06;
      imageRef2.current.rotation.z = MathUtils.lerp(
        imageRef2.current.rotation.z,
        targetRotation2,
        0.1,
      );
    }
    if (imageSymRef2.current) {
      imageSymRef2.current.position.y = 2.2 + Math.cos(time) * 0.06;
    }
  });

  return (
    <ScrollControls
      pages={getPages()}
      horizontal
      damping={0.3}
    >
      <Scroll>
        <primitive object={data.scene} />
        <group>
          <mesh
            ref={imageRef}
            position={[-1.7, 1.1, -2.5]}
            scale={[0.7, 0.7, 0.7]}
            onClick={onHandleClickBubble1}
            onPointerOut={() => {
              setOpenTooltip(false);
              setTargetRotation1(0);
            }}
            onPointerOver={() => setTargetRotation1(-Math.PI / 7.2)}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={texture} transparent />
          </mesh>
          <mesh
            ref={imageSymRef}
            position={[-1.7, 1.1, -2.5]}
            scale={[0.2, 0.3, 0]}
            onClick={onHandleClickBubble1}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={textureSym} transparent />
          </mesh>
        </group>
        {openTooltip ? (
          <group>
            <mesh
              position={[-1.1, 1.75, -2.5]}
              scale={[2.3, 1.2, 0]}
            >
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial map={texture2} transparent color="#ABC1FB" />
            </mesh>
            <mesh
              position={[-1.1, 1.85, -2.5]}
              scale={[1.65, 0.3, 0]}
            >
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial map={text} transparent />
            </mesh>
          </group>
        ) : null}
        <group>
          <mesh
            ref={imageRef2}
            position={[2.45, 2.2, -4]}
            scale={[0.8, 0.8, 0.8]}
            onClick={onHandleClickBubble2}
            onPointerOut={() => {
              setOpenTooltip2(false);
              setTargetRotation2(0);
            }}
            onPointerOver={() => setTargetRotation2(-Math.PI / 7.2)}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={texture} transparent />
          </mesh>
          <mesh
            ref={imageSymRef2}
            position={[2.45, 2.2, -4]}
            scale={[0.25, 0.36, 0]}
            onClick={onHandleClickBubble2}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={textureSym} transparent />
          </mesh>
        </group>
        {openTooltip2 ? (
          <group>
            <mesh
              position={[1.6, 2.98, -4]}
              scale={[2.8, 1.4, 0]}
            >
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial map={texture3} transparent color="#ABC1FB" />
            </mesh>
            <mesh
              position={[1.6, 3.08, -4]}
              scale={[2.1, 0.55, 0]}
            >
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial map={text2} transparent />
            </mesh>
          </group>
        ) : null}
      </Scroll>
    </ScrollControls>
  );
}

export default ApartmentModel;
