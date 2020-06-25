import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SnapshotMini} from '../../../../model/SnapshotMini';
import {DataService} from '../../../../service/data-service/data.service';

@Component({
  selector: 'app-snapshot-mini-table',
  templateUrl: './snapshot-mini-table.component.html',
  styleUrls: ['./snapshot-mini-table.component.css']
})
export class SnapshotMiniTableComponent implements OnInit {
  displayedColumns: string[] = ['Snapshot_Id', 'Timestamp', 'Markets_Info', 'As_JSON'];
  dataSource = new MatTableDataSource<SnapshotMini>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input() snapshots: SnapshotMini[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAllSnapshots()
      .subscribe(
        (snapshots: SnapshotMini[]) => {
          this.snapshots = snapshots;
          this.dataSource = new MatTableDataSource<SnapshotMini>(this.snapshots);
          this.dataSource.paginator = this.paginator;
        },
        error => console.log('get all snapshots error in smt component')
      );
  }
}
