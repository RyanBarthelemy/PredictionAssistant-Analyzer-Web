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
      error => this.buildError(error)
    );
  }

  private buildError(error) {
    console.log('error: ' + error); // setup elements needed to build an error page in html
    // this should basically never happen, only way it could happen is if call to backend API times out for w/e reason.
  }

  private getEarlierSnapId(snapshotMinis: SnapshotMini[]) {
    const timeFrameMilli = this.timeframe * 60 * 1000; // convert minutes timeframe to usable milliseconds
    let timeDiff = 999999999999;
    let indexToUse = -1;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < snapshotMinis.length; i++) {
      const timeDiffCurrent = Math.abs(this.currentSnapshot.timestamp - (new Date(snapshotMinis[i].timestampDisplay).getTime()));
      if (Math.abs(timeDiffCurrent - timeFrameMilli) < timeDiff) {
        timeDiff = Math.abs(timeDiffCurrent - timeFrameMilli);
        indexToUse = i;
      }
    }
    if (indexToUse === -1) {
      return null;
    }
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
        continue;
      }
      const marketNow: Market = this.currentSnapshot.markets[i];
      const marketPrev: Market = this.earlierSnapshot.markets[indexOfMarketInEarlierSnapshot];

      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < marketNow.contracts.length; j++) {
        const indexOfContractInEarlierMarket = this.getContractIndexById(marketPrev, marketNow.contracts[j].id);

        if (indexOfContractInEarlierMarket === null) {
          continue;
        }
        const contractNow: Contract = marketNow.contracts[j];
        const contractPrev: Contract = marketPrev.contracts[indexOfContractInEarlierMarket];
        const priceDifference = contractNow.bestBuyYesCost - contractPrev.bestBuyYesCost;

        if (Math.abs(priceDifference) > 0) {
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
      if (earlierSnapshot.markets[i].id === id) { return i; }
    }
    return null;
  }

  private getContractIndexById(marketPrev: Market, id: number) {
    for (let i = 0; i < marketPrev.contracts.length; i++) {
      if (marketPrev.contracts[i].id === id) { return i; }
    }
    return null;
  }

  public timeframeButtonClicked() {
    if (!isNaN(this.timeframeInputField)){
      this.timeframe = this.timeframeInputField;
      console.log('this.timeframe = ' + this.timeframe);
      this.buildPage();
    }
  }

  private buildPage() {
    this.dataService.getAllSnapshots().subscribe(
      (snapshotMinis: SnapshotMini[]) => {
        this.dataService.getSnapshot(snapshotMinis[0].hashID).subscribe(
          (snapshotCurrent: Snapshot) => {
            this.currentSnapshot = snapshotCurrent;
            const earlierSnapshotHashId = this.getEarlierSnapId(snapshotMinis);
            this.dataService.getSnapshot(earlierSnapshotHashId).subscribe(
              (snapshotEarlier: Snapshot) => {
                this.earlierSnapshot = snapshotEarlier;
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
