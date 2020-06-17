import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Snapshot} from '../../model/Snapshot';
import {SnapshotMini} from '../../model/SnapshotMini';
import {SnapshotMiniDisplayable} from '../../model/SnapshotMiniDisplayable';
import {Observable, of} from 'rxjs';
import {Market} from '../../model/Market';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) {
  }

  getSnapshot(id: string) {
    return this.httpClient
      .get<Snapshot>(this.baseURL + 'snapshots/' + id);
  }

  getAllSnapshots(){
    return this.httpClient
      .get<SnapshotMini[]>(this.baseURL + 'snapshots/');
  }

  getMarketHistory(id: string){
    console.log('making GET request to: ' + this.baseURL + 'markets/' + id);
    return this.httpClient
      .get<Market[]>(this.baseURL + 'markets/' + id);
  }
}
