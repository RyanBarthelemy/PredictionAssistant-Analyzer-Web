import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Snapshot} from '../../model/Snapshot';
import {SnapshotMini} from '../../model/SnapshotMini';
import {SnapshotMiniDisplayable} from '../../model/SnapshotMiniDisplayable';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  snapshot: Snapshot;

  constructor(private httpClient: HttpClient) {
  }

  getSnapshot(id: string) {
    // get the data for this snapshot id from the api page
    console.log('making request to http://localhost:8080/api/snapshots/' + id);
    return this.httpClient
      .get<Snapshot>('http://localhost:8080/api/snapshots/' + id);
  }

  getAllSnapshots(){
    return this.httpClient
      .get<SnapshotMini[]>('http://localhost:8080/api/snapshots/');
  }

  buildDisplayableSnapshotsArray(snapshots: SnapshotMini[]) {
    let displayableSnapshotMiniArr: SnapshotMiniDisplayable[];
    displayableSnapshotMiniArr = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < snapshots.length; i++) {
      const smd = new SnapshotMiniDisplayable(
        snapshots[i].hashID,
        snapshots[i].timestampDisplay,
        '/snapshots/' + snapshots[i].hashID,
        'localhost:8080/api/snapshots/' + snapshots[i].hashID
      );
      displayableSnapshotMiniArr.push(smd);
    }
    return displayableSnapshotMiniArr;
  }
}
