import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { IApp, IScreenSizes } from './interfaces/IApp';

export const initialState :IApp = {
  screenSizes: {
    isXXXLDevice: false, // more than 1920px
    isXXLDevice: false, // more than 1440px less than 1920px
    isXLDevice: false, // more than 1200px less than 1440px
    isLGLargeDevice: false, // more than 1024px less than 1200
    isLGDevice: false, // more than 992px less than 1024
    isMDDevice: false, //  more than 768px less than 992px
    isSMDevice: false, // more than 576px less than 768px
    isXSDevice: false, // more than 0 less than 576px
    screenWidth: 0, // more than 0 less than 576px
  },
  isFontReady: false,
  message: {
    text: '',
    type: '',
  },
  showTooltip: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setScreenSizes: (state, action: PayloadAction<{ screenSizes: IScreenSizes }>) => {
      state.screenSizes = action.payload.screenSizes;
    },
    setIsFontReady: (state, action: PayloadAction<{ isFontReady:boolean }>) => {
      state.isFontReady = action.payload.isFontReady;
    },
    setMessage: (state, action: PayloadAction<{ text: string, type: string }>) => {
      state.message = action.payload;
    },
    setShowTooltip: (state, action: PayloadAction<{ showTooltip: boolean }>) => {
      state.showTooltip = action.payload.showTooltip;
    },
  },
});

export const {
  setScreenSizes, setIsFontReady, setMessage, setShowTooltip,
} = appSlice.actions;

export default appSlice.reducer;
