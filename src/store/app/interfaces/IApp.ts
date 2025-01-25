export interface IApp {
  screenSizes: IScreenSizes,
  isFontReady: boolean,
  message: {
    text: string,
    type: string,
  },
  showTooltip: boolean,
}

export interface IScreenSizes {
  isXXXLDevice: boolean,
  isXXLDevice: boolean,
  isXLDevice: boolean,
  isLGLargeDevice: boolean,
  isLGDevice: boolean,
  isMDDevice: boolean,
  isSMDevice: boolean,
  isXSDevice: boolean,
  screenWidth: number,
}
