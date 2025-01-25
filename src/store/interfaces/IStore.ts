import type { IApp } from '../app/interfaces/IApp';

interface IStore {
  app: IApp,
  counterReducer: number,
}

export default IStore;
