export default interface IApartmentModel {
  tablet?: boolean,
  mobile?: boolean,
}

export interface ITooltip {
  position: [number, number, number],
  text: string,
  className: string,
}
