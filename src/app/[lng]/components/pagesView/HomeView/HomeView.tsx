/* eslint-disable react/no-unknown-property */

'use client';

import React, {
  Suspense, useEffect, useRef, useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { Euler, Vector3 } from 'three';

import ApartmentModel from '../../ApartmentModel/ApartmentModel';
import Layout from '../../Layout/Layout';
import Preloader from '../../Preloader/Preloader';

import type IHomeView from './interfaces/IHomeView';

import styles from './sass/HomeView.module.scss';

import {
  CAMERA_DATA, CAMERA_DATA_MOBILE, CAMERA_DATA_ROTATION,
  CAMERA_DATA_TABLET,
} from '@/constants/constants';
import { useAppSelector } from '@/store/hooks/storeHook';

function HomeView({ title }: IHomeView) {
  const canvasRef = useRef(null);
  const {
    screenSizes: {
      isMDDevice,
      isSMDevice,
      isXSDevice,
    },
  } = useAppSelector((state) => state?.app);
  const [scroll, setScroll] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);
  const [cameraOption, setCameraOption] = useState({
    FOV: 56,
    X: -0.5,
    Y: 0,
    Z: 5,
  });
  const [canvasKey, setCanvasKey] = useState(0);

  const getCameraParams = () => {
    setShowCanvas(false);
    if (isMDDevice || isSMDevice) {
      setCameraOption(CAMERA_DATA_TABLET);
    } else if (isXSDevice) {
      setCameraOption(CAMERA_DATA_MOBILE);
    } else {
      setCameraOption(CAMERA_DATA);
    }

    setCanvasKey((prev) => prev + 1);
  };

  useEffect(() => {
    getCameraParams();
  }, [isMDDevice, isSMDevice, isXSDevice]);

  useEffect(() => {
    if (!(isMDDevice || isSMDevice || isXSDevice)) {
      const handleScroll = () => {
        setScroll(window.scrollY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    return undefined;
  }, [isMDDevice, isSMDevice, isXSDevice]);

  const scenePosition = scroll * 0.05;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCanvas(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showCanvas) {
      const timer = setTimeout(() => {
        setShowCanvas(true);
      }, 500);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [showCanvas]);

  return (
    <Layout title={title}>
      <div className={styles.container}>
        <Suspense fallback={<Preloader />}>
          {showCanvas ? (
            <Canvas
              key={canvasKey}
              scene={{ scale: [0.9, 0.9, 0.9], position: [8, -2.13, 0], rotation: [0, 0, 0] }}
              camera={{
                fov: CAMERA_DATA.FOV,
                position: new Vector3(cameraOption.X, cameraOption.Y, cameraOption.Z),
                rotation: new Euler(CAMERA_DATA_ROTATION.X, CAMERA_DATA_ROTATION.Y, CAMERA_DATA_ROTATION.Z),
              }}
              style={{ height: '100%', width: '100vw' }}
              ref={canvasRef}
            >
              <group position={[scenePosition, 0, 0]}>
                <ApartmentModel
                  tablet={isMDDevice || isSMDevice}
                  mobile={isXSDevice}
                />
              </group>
            </Canvas>
          ) : <Preloader />}
        </Suspense>
      </div>
    </Layout>

  );
}

export default HomeView;
