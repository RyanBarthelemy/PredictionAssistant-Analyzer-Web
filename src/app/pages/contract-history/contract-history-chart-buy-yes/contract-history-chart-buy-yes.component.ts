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
        minimum: this.getMinYAxis(),
        maximum: this.getMaxYAxis(),
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
    dataArr.push(this.build_XX_MinuteSimpleMovingAverageDataSeries(10));
    dataArr.push(this.build_XX_MinuteSimpleMovingAverageDataSeries(60));
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

  private build_XX_MinuteSimpleMovingAverageDataSeries(minutes: number) {
    return {
      type: 'line',
      axisYType: 'primary',
      xValueFormatString: 'h:mmtt',
      name: minutes + 'min SMA',
      showInLegend: true,
      markerSize: 0,
      lineThickness: 3,
      dataPoints: this.build_XX_MinuteSimpleMovingAverage_DataSeriesDataPointsArray(minutes),
    };
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

  private build_XX_MinuteSimpleMovingAverage_DataSeriesDataPointsArray(minutes: number) {
    const dataPoints = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.contractHistory.length; i++) {
      const contractsToUse: Contract[] = this.getContractsToUse(i, minutes);

      // could swap to !==0 but I think this is more readable.
      if (contractsToUse.length === 0){ // if there are no contracts we can use to calc SMA, then continue (we can't divide by 0 etc)
        // continue
      }
      else{
        let sum = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < contractsToUse.length; j++) {
          sum = sum + contractsToUse[j].bestBuyYesCost;
        }
        const average = sum / contractsToUse.length;
        dataPoints.push({
          x: this.contractHistory[i].timestamp,
          y: average
        });
      }
    }
    return dataPoints;
  }

  private getContractsToUse(index: number, timeframeMins: number): Contract[] {
    const contractsToUse = [];
    const timeMax = this.contractHistory[index].timestamp.getTime(); // time in milli of the contract we are examining
    const timeMin = timeMax - (timeframeMins * 60 * 1000); // time in milli of the cutoff for this SMA analysis

    // examine each contract, if its timestamp is between timeMin and timeMax (inclusive), then add it to the contractsToUse collection.
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.contractHistory.length; i++) {
      if (this.contractHistory[i].timestamp.getTime() >= timeMin
          && this.contractHistory[i].timestamp.getTime() <= timeMax){
        contractsToUse.push(this.contractHistory[i]);
      }
    }
    return contractsToUse;
  }

  private getMinYAxis() {
    let min = 101;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.contractHistory.length; i++) {
      if (this.contractHistory[i].bestBuyYesCost < min){
        min = this.contractHistory[i].bestBuyYesCost;
      }
    }
    return min - 0.02;
  }

  private getMaxYAxis() {
    let max = -1;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.contractHistory.length; i++) {
      if (this.contractHistory[i].bestBuyYesCost > max){
        max = this.contractHistory[i].bestBuyYesCost;
      }
    }
    return max + 0.02;
  }
}
