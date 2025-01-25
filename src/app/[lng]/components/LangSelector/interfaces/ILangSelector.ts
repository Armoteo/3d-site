import type { StaticImageData } from 'next/image';

export interface Language {
  code: string,
  name: string,
  icon: string | StaticImageData,
}
export default interface ILangSelector {
  list: Language[],
}

export interface IItem {
  item: Language,
}
