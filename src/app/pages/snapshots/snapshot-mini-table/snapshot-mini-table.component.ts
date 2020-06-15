import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SnapshotMini} from '../../../../model/SnapshotMini';
import {HttpClient} from '@angular/common/http';
import {SnapshotMiniDisplayable} from '../../../../model/SnapshotMiniDisplayable';

@Component({
  selector: 'app-snapshot-mini-table',
  templateUrl: './snapshot-mini-table.component.html',
  styleUrls: ['./snapshot-mini-table.component.css']
})
export class SnapshotMiniTableComponent implements OnInit {
  displayedColumns: string[] = ['Snapshot_Id', 'Timestamp', 'Markets_Info', 'As_JSON'];
  displayableSnapshotMiniArr: SnapshotMiniDisplayable[];
  dataSource = new MatTableDataSource<SnapshotMiniDisplayable>(this.displayableSnapshotMiniArr);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  snapshots: SnapshotMini[];

  constructor(private httpClient: HttpClient) // injecting the http client in the constructor here
  { }

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/api/snapshots/').subscribe((data: SnapshotMini[]) => {
      this.snapshots = data;
      this.displayableSnapshotMiniArr = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.snapshots.length; i++) {
        const smd = new SnapshotMiniDisplayable(
          this.snapshots[i].hashID,
          this.snapshots[i].timestampDisplay,
          '/snapshots/' + this.snapshots[i].hashID,
          'localhost:8080/api/snapshots/' + this.snapshots[i].hashID
        );
        if (this.displayableSnapshotMiniArr === undefined){
          console.log('displayableSnapshotMiniArr is undef');
        }
        // console.log('adding SnapshotMiniDisplayable to array:');
        // console.log(smd);
        this.displayableSnapshotMiniArr.push(smd);
      }
      console.log(this.displayableSnapshotMiniArr);
      this.dataSource = new MatTableDataSource<SnapshotMiniDisplayable>(this.displayableSnapshotMiniArr);
      this.dataSource.paginator = this.paginator;
    });
  }
}
