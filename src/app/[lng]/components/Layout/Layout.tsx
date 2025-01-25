import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  LG_DEVICE, LG_LARGE_DEVICE, MD_DEVICE, SM_DEVICE, XL_DEVICE, XS_DEVICE, XXL_DEVICE, XXXL_DEVICE,
} from '../../../../constants/constants';
import { setScreenSizes } from '../../../../store/app/slice';
import Header from '../Header/Header';

import type ILayout from './interface/ILayout';

import styles from './sass/Layout.module.scss';

function Layout({ children }: ILayout) {
  const dispatch = useDispatch();

  const onScreenWidthChange = () => {
    const screenWidth = window.innerWidth;

    dispatch(setScreenSizes({
      screenSizes: {
        isXXXLDevice: screenWidth >= XXXL_DEVICE,
        isXXLDevice: screenWidth >= XXL_DEVICE && screenWidth < XXXL_DEVICE,
        isXLDevice: screenWidth >= XL_DEVICE && screenWidth < XXL_DEVICE,
        isLGLargeDevice: screenWidth >= LG_LARGE_DEVICE && screenWidth < XL_DEVICE,
        isLGDevice: screenWidth > LG_DEVICE && screenWidth < LG_LARGE_DEVICE,
        isMDDevice: screenWidth >= MD_DEVICE && screenWidth <= LG_DEVICE,
        isSMDevice: screenWidth >= SM_DEVICE && screenWidth < MD_DEVICE,
        isXSDevice: screenWidth >= XS_DEVICE && screenWidth < SM_DEVICE,
        screenWidth,
      },
    }));
  };

  useEffect(() => {
    const screenUpdate = setTimeout(() => {
      onScreenWidthChange();
    }, 1000);

    return () => {
      clearTimeout(screenUpdate);
    };
  }, []);

  useEffect(() => {
    onScreenWidthChange();
    window.addEventListener('resize', onScreenWidthChange);

    return () => {
      window.removeEventListener('resize', onScreenWidthChange);
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
