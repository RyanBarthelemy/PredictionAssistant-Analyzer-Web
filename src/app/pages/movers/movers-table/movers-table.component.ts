import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Mover} from '../../../../model/Mover';
import {MatPaginator} from '@angular/material/paginator';
import {of} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-movers-table',
  templateUrl: './movers-table.component.html',
  styleUrls: ['./movers-table.component.css']
})
export class MoversTableComponent implements OnInit {

  displayedColumns: string[] = ['Movement', 'Contract', 'Market', 'Link'];
  @Input() movers: Mover[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
    of(this.movers).subscribe(
      data => {
        this.movers = data;
        console.log('movers length in table component: ' + this.movers.length);
        this.dataSource = new MatTableDataSource<Mover>(this.movers);
        this.dataSource.paginator = this.paginator;
      },
      error => console.log('ERROR: ' + error)
      );
  }

}
