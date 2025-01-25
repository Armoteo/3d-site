/* eslint-disable react/no-unknown-property */

'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Scroll,
  ScrollControls,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import type IApartmentModel from './interfaces/IApartmentModel';

import { BUBBLE_PATH, MODEL_PATH } from '@/constants/constants';

function ApartmentModel({ tablet, mobile }: IApartmentModel) {
  const data = useGLTF(MODEL_PATH);

  // Завантаження текстур
  const mapAlpha1 = useTexture('/Textures/Map_1_Alpha_1.jpg');
  const mapColor1 = useTexture('/Textures/Map_1_Color_1.jpg');
  const mapColorAlpha1 = useTexture('/Textures/Map_1_ColorAlpha_1.png');
  const mapAlpha2 = useTexture('/Textures/Map_2_Alpha_1.jpg');
  const mapColor2 = useTexture('/Textures/Map_2_Color_1.jpg');
  const mapColorAlpha2 = useTexture('/Textures/Map_2_ColorAlpha_1.png');
  const mapAlpha3 = useTexture('/Textures/Map_3_Alpha_1.jpg');
  const mapColor3 = useTexture('/Textures/Map_3_Color_1.jpg');
  const mapColorAlpha3 = useTexture('/Textures/Map_3_ColorAlpha_1.png');
  const texture = useTexture(BUBBLE_PATH);
  const texture2 = useTexture('/im_Tooltip.webp');
  const texture3 = useTexture('/img_Tooltip2.webp');

  const imageRef = useRef<THREE.Mesh>(null);
  const imageRef2 = useRef<THREE.Mesh>(null);

  const [openTooltip, setOpenTooltip] = useState<boolean>(false);
  const [openTooltip2, setOpenTooltip2] = useState<boolean>(false);

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
    }
    if (imageRef2.current) {
      imageRef2.current.position.y = 2.1 + Math.cos(time) * 0.06;
    }
  });

  return (
    <ScrollControls pages={getPages()} horizontal damping={0.25}>
      <Scroll>
        <primitive object={data.scene} />

        {/* Bubble 1 with Alpha blending */}
        <mesh
          ref={imageRef}
          position={[-1.7, 1.1, -2.5]}
          scale={[0.8, 0.8, 0.8]}
          onClick={onHandleClickBubble1}
          onPointerOut={() => setOpenTooltip(false)}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={texture}
            transparent
            blending={THREE.NormalBlending} // Alpha
            depthWrite={false}
          />
        </mesh>
        {openTooltip ? (
          <mesh
            position={[-1.1, 1.7, -2.5]}
            scale={[2.3, 1.2, 0]}
            onClick={onHandleClickBubble1}
            onPointerOut={() => setOpenTooltip(false)}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={texture2}
              transparent
              blending={THREE.AdditiveBlending} // Alpha
              depthWrite={false}
            />
          </mesh>
        ) : null}

        {/* Bubble 2 with Clip blending */}
        <group>
          <mesh
            ref={imageRef2}
            position={[2.45, 2.1, -4]}
            scale={[0.8, 0.8, 0.8]}
            onClick={onHandleClickBubble2}
            onPointerOut={() => setOpenTooltip2(false)}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              map={texture}
              transparent
              alphaTest={0.5} // Clip
            />
          </mesh>
          {openTooltip2 ? (
            <mesh
              position={[1.6, 2.8, -4]}
              scale={[2.8, 1.4, 0]}
              onClick={onHandleClickBubble1}
              onPointerOut={() => setOpenTooltip(false)}
            >
              <planeGeometry args={[1, 1]} />
              <meshBasicMaterial
                map={texture3}
                transparent
                alphaTest={0.5} // Clip
              />
            </mesh>
          ) : null}
        </group>
      </Scroll>
    </ScrollControls>
  );
}

export default ApartmentModel;
