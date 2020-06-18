import {Component, Input, OnInit} from '@angular/core';
import {Market} from '../../../../model/Market';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {of} from 'rxjs';

// https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
// don't forget to 'npm install ng2-charts chart.js --save' if you need to
@Component({
  selector: 'app-market-data-chart-buy-yes',
  templateUrl: './market-data-chart-buy-yes.component.html',
  styleUrls: ['./market-data-chart-buy-yes.component.css']
})
export class MarketDataChartBuyYesComponent implements OnInit {

  @Input() marketHistory: Market[];

  lineChartData: ChartDataSets[] = [
    {data: [], label: ''},
  ];

  lineChartLabels: Label[];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'transparent'
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor() {
  }

  ngOnInit(): void {
    of(this.marketHistory).subscribe(
      data => this.buildDataSet(),
      error => console.log(error)
    );
  }

  private buildDataSet() {
    const lineChartData: ChartDataSets[] = [];
    const labels = [];

    const priceArray = [];
    const dataSetLabel = this.marketHistory[0].contracts[0].name;
    this.lineChartLabels = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.marketHistory.length; i++) {
      priceArray.push(this.marketHistory[i].contracts[0].bestBuyYesCost);
      labels.push(this.marketHistory[i].timeStamp);
    }
    this.lineChartLabels = labels.reverse();
    this.lineChartData[0].data = priceArray.reverse();
    this.lineChartData[0].label = dataSetLabel;

  }
}
