import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Snapshot} from '../../../../model/Snapshot';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Market} from '../../../../model/Market';
import {of} from 'rxjs';

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
    of(this.snapshot).subscribe(
      data => {
        this.snapshot = data;
        console.log('snapshot markets: ' + this.snapshot.markets);
        this.dataSource = new MatTableDataSource<Market>(this.snapshot.markets);
        this.dataSource.paginator = this.paginator;
      },
      error => console.log('error creating table, todo: send error back to parent so it knows to create error info DOM elements::: '
                                + '\nErrorMessage: ' + error)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
