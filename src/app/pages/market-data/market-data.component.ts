import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../service/data-service/data.service';
import {ActivatedRoute} from '@angular/router';
import {Market} from '../../../model/Market';

@Component({
  selector: 'app-market-data',
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.css']
})
export class MarketDataComponent implements OnInit {

  marketHistory: Market[];

  error: boolean;
  errorStatus: number;
  errorMessage: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      // snapshot does NOT refer to PA Snapshot. It is the ActivatedRouteSnapshot object
      const mid = this.route.snapshot.paramMap.get('mid');

      console.log('the id from url = ' + mid);

      this.dataService.getMarketHistory(mid)
        .subscribe(
          (marketHistory: Market[]) => this.buildSuccessPage(marketHistory),
          error => this.buildErrorPage(error)
        );
    });
  }

  private buildSuccessPage(marketHistory: Market[]) {
    this.marketHistory = marketHistory;
    this.error = false;
  }

  private buildErrorPage(error: any) {
    this.error = true;
    this.errorStatus = error.status;
    this.errorMessage = error.error.message;
  }
}
