import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Contract} from '../../../../model/Contract';
import {of} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-contract-history-table',
  templateUrl: './contract-history-table.component.html',
  styleUrls: ['./contract-history-table.component.css']
})
export class ContractHistoryTableComponent implements OnInit {

  displayedColumns: string[] = ['Timestamp', 'Buy_Yes', 'Sell_Yes', 'Buy_No', 'Sell_No'];
  @Input() contractHistory: Contract[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
    of(this.contractHistory).subscribe(
      data => {
        this.contractHistory = data;
        this.dataSource = new MatTableDataSource<Contract>(this.contractHistory);
        this.dataSource.paginator = this.paginator;
      },
      error => console.log('ERROR: ' + error)
    );
  }

}
