import {Component, Input, OnInit} from '@angular/core';
import {Market} from '../../../../model/Market';
import {of} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {Contract} from '../../../../model/Contract';

@Component({
  selector: 'app-market-data-table',
  templateUrl: './market-data-table.component.html',
  styleUrls: ['./market-data-table.component.css']
})
export class MarketDataTableComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Buy_Yes', 'Sell_Yes', 'Buy_No', 'Sell_No', 'History_Link'];
  @Input() marketHistory: Market[];
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
    of(this.marketHistory).subscribe(
      data => {
        this.marketHistory = data;
        // we want a table of the latest contract info like buy/sell prices for each contract in this market.
        // since we want the latest prices we use index 0 of the marketHistory array since that index corresponds to the latest snapshot.
        this.dataSource = new MatTableDataSource<Contract>(this.marketHistory[0].contracts);
      },
      error => console.log('ERROR: ' + error)
    );
  }

}
