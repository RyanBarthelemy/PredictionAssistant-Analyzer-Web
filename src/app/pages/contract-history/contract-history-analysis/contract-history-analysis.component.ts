import {Component, Input, OnInit} from '@angular/core';
import {Contract} from '../../../../model/Contract';
import {of} from 'rxjs';

@Component({
  selector: 'app-contract-history-analysis',
  templateUrl: './contract-history-analysis.component.html',
  styleUrls: ['./contract-history-analysis.component.css']
})
export class ContractHistoryAnalysisComponent implements OnInit {

  @Input() contractHistory: Contract[];
  move10Message: string;
  move60Message: string;
  move24hMessage: string;
  sma10: number;
  sma60: number;
  BuySellHold: string;

  constructor() { }

  ngOnInit(): void {
    of(this.contractHistory).subscribe(
      data => this.analyzeContractHistory(),
      error => console.log(error)
    );
  }

  private analyzeContractHistory() {
    console.log('got to analyze Contract History method');
    this.move10Message = this.getMoveMessage(10);
    this.move60Message = this.getMoveMessage(60);
    this.move24hMessage = this.getMoveMessage(24 * 60);

    this.sma10 = this.getSMA_MostRecent(10);
    this.sma60 = this.getSMA_MostRecent(60);

    console.log('sma10: ' + this.sma10);
    console.log('sma60: ' + this.sma60);

    if (this.sma60 - this.sma10 >= 0.02){
      this.BuySellHold = 'Sell';
    }
    else if (this.sma10 - this.sma60 >= 0.02){
      this.BuySellHold = 'Buy';
    }
    else{
      this.BuySellHold = 'Hold';
    }
  }

  private getMoveMessage(minutes: number) {
    const contractToUse = this.getContractClosestToTimestamp(this.contractHistory[0].timestamp.getTime() - (minutes * 60 * 1000));
    if (contractToUse === null){
      return 'Could not find Contract to examine movement from ' + minutes + ' mins ago';
    }
    const movement = Math.round((this.contractHistory[0].bestBuyYesCost - contractToUse.bestBuyYesCost) * 100.0);
    Math.round(this.contractHistory[0].bestBuyYesCost - contractToUse.bestBuyYesCost);
    if (minutes <= 60){
      if (movement < 0){
        return movement + ' in last ' + minutes + ' mins.';
      }
      return '+' + movement + ' in last ' + minutes + ' mins.';
    }
    else{
      if (movement < 0){
        return movement + ' in last ' + (minutes / 60) + ' hours.';
      }
      return '+' + movement + ' in last ' + (minutes / 60) + ' hours.';
    }
  }

  private getContractClosestToTimestamp(timeMilli: number) {
    let timeDiff = 999999999;
    let contractToUse;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.contractHistory.length; i++) {
      if (Math.abs(this.contractHistory[i].timestamp.getTime() - timeMilli) < timeDiff){
        timeDiff = Math.abs(this.contractHistory[i].timestamp.getTime() - timeMilli);
        contractToUse = i;
      }
    }
    // tslint:disable-next-line:max-line-length
    if (Math.abs(this.contractHistory[0].timestamp.getTime() - this.contractHistory[contractToUse].timestamp.getTime()) > (timeMilli * 1.2)){
      return null;
    }
    return this.contractHistory[contractToUse];
  }

  private getSMA_MostRecent(minutes: number) {
    const contractsToUse: Contract[] = this.getContractsToUse(0, minutes);

    // could swap to !==0 but I think this is more readable.
    if (contractsToUse.length === 0){ // if there are no contracts we can use to calc SMA, then continue (we can't divide by 0 etc)
      return null;
    }
    else {
      let sum = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < contractsToUse.length; j++) {
        sum = sum + contractsToUse[j].bestBuyYesCost;
      }
      return sum / contractsToUse.length;
    }
  }

  private getContractsToUse(index: number, timeframeMins: number) {
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
}
