import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SnapshotMini} from '../../../../model/SnapshotMini';
import {SnapshotMiniDisplayable} from '../../../../model/SnapshotMiniDisplayable';
import {DataService} from '../../../../service/data-service/data.service';

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
  @Input() snapshots: SnapshotMini[];

  constructor(private dataService: DataService) // injecting the http client in the constructor here
  {
  }

  ngOnInit() {
    this.dataService.getAllSnapshots()
      .subscribe(
        (snapshots: SnapshotMini[]) => this.buildTable(snapshots),
        error => console.log('get all snapshots error in smt component')
      );
  }

  private buildTable(snapshots: SnapshotMini[]) {
    this.snapshots = snapshots;
    this.displayableSnapshotMiniArr = this.dataService.buildDisplayableSnapshotsArray(this.snapshots);

    console.log(this.displayableSnapshotMiniArr);
    this.dataSource = new MatTableDataSource<SnapshotMiniDisplayable>(this.displayableSnapshotMiniArr);
    this.dataSource.paginator = this.paginator;
  }
}
