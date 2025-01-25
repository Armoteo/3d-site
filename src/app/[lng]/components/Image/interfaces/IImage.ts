import type { StaticImageData } from 'next/image';

export default interface IImage {
  src:string | StaticImageData,
  alt:string,
  sizes?: string,
  width?:number,
  height?: number,
  quality?: number,
  fill?: boolean,
  priority?: boolean,
  className?: string,
  loading?: 'eager' | 'lazy',
}
