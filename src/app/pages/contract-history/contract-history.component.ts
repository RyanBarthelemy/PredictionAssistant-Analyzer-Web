import {Component, OnInit} from '@angular/core';
import {Market} from '../../../model/Market';
import {DataService} from '../../../service/data-service/data.service';
import {ActivatedRoute} from '@angular/router';
import {Contract} from '../../../model/Contract';

@Component({
  selector: 'app-contract-history',
  templateUrl: './contract-history.component.html',
  styleUrls: ['./contract-history.component.css']
})
export class ContractHistoryComponent implements OnInit {

  contractHistory: Contract[];
  marketName: string;
  marketId: number;

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
      const cid = Number(this.route.snapshot.paramMap.get('cid'));

      if (isNaN(cid)){
        console.log('Could not parse contract id into a number, found path param id:' + this.route.snapshot.paramMap.get('cid'));
        this.error = true;
        this.errorStatus = 400;
        this.errorMessage = 'Could not parse contract id into a number, found path param id:' + this.route.snapshot.paramMap.get('cid');
        return;
      }

      console.log('the mid from url = ' + mid);
      console.log('the cid from url = ' + cid);

      this.dataService.getMarketHistory(mid)
        .subscribe(
          (marketHistory: Market[]) => this.buildSuccessPage(marketHistory, cid),
          error => this.buildErrorPage(error)
        );
    });
  }

  private buildErrorPage(error: any) {
    this.error = true;
    this.errorStatus = error.status;
    this.errorMessage = error.error.message;
  }

  private buildSuccessPage(marketHistory: Market[], cid: number) {
    this.buildContractHistory(marketHistory, cid);
  }

  private buildContractHistory(marketHistory: Market[], cid: number) {
    this.contractHistory = [];
    this.marketName = marketHistory[0].name;
    this.marketId = marketHistory[0].id;
    let contractIndex = -1;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < marketHistory[0].contracts.length; i++) {
      if (marketHistory[0].contracts[i].id === cid){
        contractIndex = i;
      }
    }

    if (contractIndex === -1){
      console.log('DataService found Market but Contract History builder could not find contract with id:' + cid);
      this.error = true;
      this.errorStatus = 404;
      this.errorMessage = 'Found market with id: ' + this.marketId + ', but could not find Contract in that Market with contractId: ' + cid;
    }
    else{
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < marketHistory.length; i++) {
        // tslint:disable-next-line:max-line-length
        marketHistory[i].contracts[contractIndex].timestamp = new Date(marketHistory[i].timeStamp.toString().replace('T', ' '));
        this.contractHistory.push(marketHistory[i].contracts[contractIndex]);
      }
      this.error = false;
    }
  }

  getMarketAndContractName() {
    if (this.marketName === this.contractHistory[0].name){
      return 'Yes/No -- ' + this.marketName;
    }
    return this.contractHistory[0].name + ' -- ' + this.marketName;
  }
}
