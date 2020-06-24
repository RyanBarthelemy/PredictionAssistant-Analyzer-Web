import {Component, Input, OnInit} from '@angular/core';
import {Market} from '../../../../model/Market';
import {of} from 'rxjs';
import * as CanvasJS from 'src/assets/canvasjs.min.js';

// We want a multi series line chart like this: https://canvasjs.com/javascript-charts/multi-series-line-chart/
// Info can be found here https://canvasjs.com/angular-charts/

// todo: look at Angular CanvasJS chart examples I downloaded. Look for multi-series-line-chart, ideally with zooming and panning
@Component({
  selector: 'app-market-data-chart-buy-yes',
  templateUrl: './market-data-chart-buy-yes.component.html',
  styleUrls: ['./market-data-chart-buy-yes.component.css']
})
export class MarketDataChartBuyYesComponent implements OnInit {

  @Input() marketHistory: Market[];

  constructor() {
  }

  ngOnInit(): void {
    of(this.marketHistory).subscribe(
      data => this.buildMarketHistoryChart(),
      error => console.log(error)
    );
  }

  private buildMarketHistoryChart() {
    const chart = new CanvasJS.Chart('chartContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: false,
      tooltip: {
        shared: true
      },
      axisY2: {
        minimum: 0,
        maximum: 1,
        title: 'BuyYes Price',
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'top',
        horizontalAlign: 'center',
        dockInsidePlotArea: false,
        itemclick: itemclick
      },
      title: {
        text: this.getTitle()
      },
      subtitles: [{
        text: 'Buy-Yes Prices'
      }],
      data: this.buildDataArray(),
    });
    chart.render();

    function itemclick(e) {
      // if the visibility setting is undefined or is set to visible, toggle it false. If not visible, set it visible.
      // this is so when we click on a data series in the legend we can toggle that specific series on/off
      if (typeof(e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else{
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }

  private getTitle() {
    return this.marketHistory[0].name;
  }

  private buildDataArray() {
    const dataArr = new Array(this.marketHistory[0].contracts.length);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < dataArr.length; i++) {
      dataArr[i] = this.buildDataEntry(i);
    }
    console.log('dataArr:' + dataArr);
    return dataArr;
  }

  private buildDataEntry(contractIndex: number) {
    return {
      type: 'line',
      axisYType: 'secondary',
      name: this.marketHistory[0].contracts[contractIndex].name,
      showInLegend: true,
      markerSize: 0,
      lineThickness: 4,
      dataPoints: this.buildDataPointsArray(contractIndex)
    };
  }

  private buildDataPointsArray(contractIndex: number) {
    const dataPointsArray = new Array(this.marketHistory.length);
    console.log('There are ' + dataPointsArray.length + ' data points');
    for (let i = 0; i < dataPointsArray.length; i++) {
      dataPointsArray[i] = this.getDataPoint(i, contractIndex);
      // console.log('dataPointsArray[' + i + '] x: ' + dataPointsArray[i].x); // laggy
    }
    return dataPointsArray;
  }

  private getDataPoint(historyIndex: number, contractIndex: number) {
    return {
      // todo: change how timestamp displays probably
      x: this.getXString(historyIndex, contractIndex),
      y: this.marketHistory[historyIndex].contracts[contractIndex].bestBuyYesCost
    };
  }

  private getXString(historyIndex: number, contractIndex: number) {
    // needs a date or number value
    return new Date(this.marketHistory[historyIndex].timeStamp.toString().replace('T', ' '));
  }
}
