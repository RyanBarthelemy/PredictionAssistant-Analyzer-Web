import {Market} from './Market';

export interface Snapshot {
  hashId: number;
  timestamp: number;
  markets: Market[];
}
