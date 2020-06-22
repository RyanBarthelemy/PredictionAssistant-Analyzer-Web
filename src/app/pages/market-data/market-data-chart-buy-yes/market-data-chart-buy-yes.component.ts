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
    scales: {
      yAxes: [{
        ticks: {
          max: 1,
          min: 0,
          stepSize: 0.05
        }
      }]
    }
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
    const labels = [];

    const priceArray = [];
    const dataSetLabel = this.marketHistory[0].contracts[0].name;
    this.lineChartLabels = [];
    const latestSnapshotTime = new Date(this.marketHistory[0].timeStamp.toString().replace('T', ' ')).getTime();

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.marketHistory.length; i++) {
      priceArray.push(this.marketHistory[i].contracts[0].bestBuyYesCost);
      const timestamp: Date = new Date(this.marketHistory[i].timeStamp.toString().replace('T', ' '));
      const timeDifferenceMinutes = (latestSnapshotTime - timestamp.getTime()) / (1000 * 60);

      // okay so converting UTC Date given by PredictIt to the local user's time zone that also correctly accounts for DST is unnecessarily
      //  complicated. I also think it is easier to use the chart if data points are show how old the data is rather than a timestamp
      // the following converts shows how old the data point is in minutes if less than an hour, or hours old otherwise.
      if (timeDifferenceMinutes < 60){
        labels.push(timeDifferenceMinutes.toFixed(0).toString() + ' mins ago');
      }
      else{
        const timeDifferenceHours = (latestSnapshotTime - timestamp.getTime()) / (1000 * 60 * 60);
        labels.push(timeDifferenceHours.toFixed(1).toString() + ' hours ago');
      }
    }

    // we have to reverse these so the chart reads from left(oldest data) to right(newest data).
    this.lineChartLabels = labels.reverse();
    this.lineChartData[0].data = priceArray.reverse();

    this.lineChartData[0].label = dataSetLabel;

  }
}
