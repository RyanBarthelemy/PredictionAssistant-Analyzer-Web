import {Status} from 'tslint/lib/runner';
import {Contract} from './Contract';

export interface Market {
  marketUniqueID: number;
  timeStamp: Date;
  image: null;
  name: string;
  id: number;
  shortName: null;
  contracts: Contract[];
  url: string;
  status: string;
}
