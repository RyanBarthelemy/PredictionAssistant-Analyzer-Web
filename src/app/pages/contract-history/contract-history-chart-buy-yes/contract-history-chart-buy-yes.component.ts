import {Component, Input, OnInit} from '@angular/core';
import {Contract} from '../../../../model/Contract';
import {of} from 'rxjs';
import * as CanvasJS from 'src/assets/canvasjs.min.js';

@Component({
  selector: 'app-contract-history-chart-buy-yes',
  templateUrl: './contract-history-chart-buy-yes.component.html',
  styleUrls: ['./contract-history-chart-buy-yes.component.css']
})
export class ContractHistoryChartBuyYesComponent implements OnInit {

  @Input() contractHistory: Contract[];
  @Input() marketName: string;

  constructor() {
  }

  ngOnInit(): void {
    of(this.contractHistory).subscribe(
      data => this.buildContractHistoryChart(),
      error => console.log('error')
    );
  }

  private buildContractHistoryChart() {
    console.log('contract history length: ' + this.contractHistory.length);
    const chart = new CanvasJS.Chart('chartContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: false,
      toolTip: {
        shared: true
      },
      axisY: {
        minimum: 0,
        maximum: 1,
        title: 'BuyYes Price',
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'top',
        horizontalAlign: 'center',
        dockInsidePlotArea: false,
        itemclick
      },
      title: {
        text: this.getTitle(),
        fontSize: 36
      },
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

  private getTitle(){
    if (this.contractHistory[0].name === this.marketName){
      return 'Yes/No -- ' + this.marketName;
    }
    else{
      return this.contractHistory[0].name + ' -- ' + this.marketName;
    }
  }

  private buildDataArray() {
    const dataArr = [];
    dataArr.push(this.buildContractHistoryDataSeries());
    // dataArr.push(this.build10MinuteSimpleMovingAverageDataSeries());
    return dataArr;
  }

  private buildContractHistoryDataSeries() {
    return {
      type: 'line',
      axisYType: 'primary',
      xValueFormatString: 'h:mmtt',
      name: this.contractHistory[0].name,
      showInLegend: true,
      markerSize: 0,
      lineThickness: 5,
      dataPoints: this.buildContractHistoryDataSeriesDataPointsArray()
    };
  }

  private build10MinuteSimpleMovingAverageDataSeries() {
    // todo
  }

  private buildContractHistoryDataSeriesDataPointsArray() {
    const dataPoints = [];
    for (let i = 0; i < this.contractHistory.length; i++) {
      dataPoints.push(this.getDataPoint(i));
    }
    return dataPoints;
  }

  private getDataPoint(index: number) {
    return {
      x: this.contractHistory[index].timestamp,
      y: this.contractHistory[index].bestBuyYesCost
    };
  }
}
