import {Component, OnInit, Output} from '@angular/core';
import {Snapshot} from '../../../model/Snapshot';
import {DataService} from '../../../service/data-service/data.service';
import {SnapshotMini} from '../../../model/SnapshotMini';
import {Market} from '../../../model/Market';
import {Contract} from '../../../model/Contract';
import {Mover} from '../../../model/Mover';
import {of} from 'rxjs';

@Component({
  selector: 'app-movers',
  templateUrl: './movers.component.html',
  styleUrls: ['./movers.component.css']
})
export class MoversComponent implements OnInit {

  private readonly DEFAULT_TIMEFRAME = 10; // mins
  timeframe: number;

  currentSnapshot: Snapshot;
  earlierSnapshot: Snapshot;

  movers: Mover[];
  timeframeInputField: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.timeframe = this.DEFAULT_TIMEFRAME;
    of(this.timeframe).subscribe(
      timeframe => this.buildPage(),
      error => console.log(error)
    );
  }

  private buildError(error) {
    console.log('error: ' + error);
  }

  private getEarlierSnapId(snapshotMinis: SnapshotMini[]) {
    const timeFrameMilli = this.timeframe * 60 * 1000;
    // console.log('timeFrameMilli: ' + timeFrameMilli);
    let timeDiff = 999999999999;
    let indexToUse = -1;
    // console.log(snapshotMinis[0].timestampDisplay);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < snapshotMinis.length; i++) {
      const timeDiffCurrent = Math.abs(this.currentSnapshot.timestamp - (new Date(snapshotMinis[i].timestampDisplay).getTime()));
      // console.log(i + ': timeDiffCurrent: ' + timeDiffCurrent);
      // console.log(Math.abs(timeDiffCurrent - timeFrameMilli));
      // console.log('TimeDifference: ' + Math.abs(timeDiffCurrent - timeFrameMilli));
      if (Math.abs(timeDiffCurrent - timeFrameMilli) < timeDiff) {
        timeDiff = Math.abs(timeDiffCurrent - timeFrameMilli);
        indexToUse = i;
        // console.log('Updated indexToUse to = ' + indexToUse);
      }
    }
    if (indexToUse === -1) {
      return null;
    }
    // console.log('earlier snapshot hashId: ' + snapshotMinis[indexToUse].hashID);
    return snapshotMinis[indexToUse].hashID;
  }

  private calculateMovers() {
    this.movers = [];
    // for each contract in each market, examine the buyYes difference. If it exists then do something with it.
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.currentSnapshot.markets.length; i++) {
      // the market may not be contained in the earlier snapshot, ie the market may be new or something, so we need to check.
      const indexOfMarketInEarlierSnapshot = this.getMarketIndexById(this.earlierSnapshot, this.currentSnapshot.markets[i].id);
      if (indexOfMarketInEarlierSnapshot === null) {
        // console.log('indexOfMarketInEarlierSnapshot is NULL');
        continue;
      }
      const marketNow: Market = this.currentSnapshot.markets[i];
      const marketPrev: Market = this.earlierSnapshot.markets[indexOfMarketInEarlierSnapshot];

      // console.log(marketNow.timeStamp + ' --- ' + marketPrev.timeStamp);
      // console.log('MarketID: ' + marketPrev.id + ' -- NumContracts: ' + marketNow.contracts.length);
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < marketNow.contracts.length; j++) {
        const indexOfContractInEarlierMarket = this.getContractIndexById(marketPrev, marketNow.contracts[j].id);
        if (indexOfContractInEarlierMarket === null) {
          console.log('indexOfContractInEarlierMarket is NULL');
          continue;
        }
        const contractNow: Contract = marketNow.contracts[j];
        const contractPrev: Contract = marketPrev.contracts[indexOfContractInEarlierMarket];

        const priceDifference = contractNow.bestBuyYesCost - contractPrev.bestBuyYesCost;
        // console.log(priceDifference);
        if (Math.abs(priceDifference) > 0) {
          // console.log(priceDifference.toFixed(2) + ' -- ' + contractNow.name + ' -- ' + marketNow.name);
          const mover: Mover = {
            marketName: marketNow.name,
            contractName: contractNow.name,
            mid: marketNow.id,
            cid: contractNow.id,
            movement: Math.round((priceDifference * 100)),
            timeframe: this.timeframe
          };
          if (mover.marketName === mover.contractName){
            mover.contractName = 'Yes/No';
          }

          // If a contract has no shares available to buy it counts the price as 0...
          // So, for ex, a 'solved' contract worth 0.95 might not have any more shares available, so price would then show as 0
          // This makes movement show a difference of -0.95 which is huge movement but isn't real or meaningful for us, so we ignore it.
          if (Math.abs(mover.movement) < 95){
            this.movers.push(mover);
          }
        }
      }
    }
    // we want to sort the list of movers so the biggest movers are first regardless of + or - movement
    this.movers.sort((a, b) => Math.abs(a.movement) < Math.abs(b.movement) ? 1 : Math.abs(a.movement) > Math.abs(b.movement) ? -1 : 0);
    console.log('movers length: ' + this.movers.length);
  }

  private getMarketIndexById(earlierSnapshot: Snapshot, id: number) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < earlierSnapshot.markets.length; i++) {
      if (earlierSnapshot.markets[i].id === id) {
        return i;
      }
    }
    return null;
  }

  private getContractIndexById(marketPrev: Market, id: number) {
    for (let i = 0; i < marketPrev.contracts.length; i++) {
      if (marketPrev.contracts[i].id === id) {
        return i;
      }
    }
    return null;
  }

  public timeframeButtonClicked() {
    console.log('button click test -- ' + this.timeframeInputField);
    if (isNaN(this.timeframeInputField)){
      console.log(this.timeframeInputField + ' is not a number...');
      return;
    }
    this.timeframe = this.timeframeInputField;
    console.log('this.timeframe = ' + this.timeframe);
    this.buildPage();
  }

  private buildPage() {
    console.log('buildPage called');
    this.dataService.getAllSnapshots().subscribe(
      (snapshotMinis: SnapshotMini[]) => {
        // console.log(snapshotMinis.length);
        this.dataService.getSnapshot(snapshotMinis[0].hashID).subscribe(
          (snapshotCurrent: Snapshot) => {
            this.currentSnapshot = snapshotCurrent;
            // console.log('current snapshot timestamp: ' + new Date(snapshotCurrent.timestamp));
            const earlierSnapshotHashId = this.getEarlierSnapId(snapshotMinis);
            // console.log('Earlier Snapshot HashID: ' + earlierSnapshotHashId);
            // console.log('Current Snapshot HashID: ' + this.currentSnapshot.hashId);
            this.dataService.getSnapshot(earlierSnapshotHashId).subscribe(
              (snapshotEarlier: Snapshot) => {
                this.earlierSnapshot = snapshotEarlier;
                // console.log('Earlier Timestamp: ' + this.earlierSnapshot.timestamp);
                // console.log('Most Recent Timestamp:' + this.currentSnapshot.timestamp);
                // console.log('Time Difference: ' + (this.currentSnapshot.timestamp - this.earlierSnapshot.timestamp));
                this.calculateMovers();
              },
              error => this.buildError(error)
            );
          },
          error => this.buildError(error)
        );
      },
      error => this.buildError(error),
    );
  }
}
