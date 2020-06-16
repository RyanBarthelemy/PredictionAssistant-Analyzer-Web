import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Snapshot} from '../../../../model/Snapshot';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Market} from '../../../../model/Market';

@Component({
  selector: 'app-markets-table',
  templateUrl: './markets-table.component.html',
  styleUrls: ['./markets-table.component.css']
})
export class MarketsTableComponent implements OnInit {
  displayedColumns: string[] = ['Market_Id', 'Name', 'PI_Link', 'Contracts'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Input() snapshot: Snapshot;
  dataSource: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.snapshot);
    const dataSource = new MatTableDataSource<Market>(this.snapshot.markets);
    dataSource.paginator = this.paginator;
  }

  buildTable(){
    console.log(this.snapshot);
    const dataSource = new MatTableDataSource<Market>(this.snapshot.markets);
    dataSource.paginator = this.paginator;
  }

}
