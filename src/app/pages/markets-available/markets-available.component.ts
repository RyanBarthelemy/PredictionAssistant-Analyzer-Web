import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Snapshot} from '../../../model/Snapshot';
import {DataService} from '../../../service/data-service/data.service';

@Component({
  selector: 'app-markets-available',
  templateUrl: './markets-available.component.html',
  styleUrls: ['./markets-available.component.css']
})
export class MarketsAvailableComponent implements OnInit {

  error: boolean;
  errorStatus: number;
  errorMessage: string;

  snapshot: Snapshot;

  constructor(private dataService: DataService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      // snapshot does NOT refer to PA Snapshot. It is the ActivatedRouteSnapshot object
      const id = this.route.snapshot.paramMap.get('hashId');

      console.log('the id from url = ' + id);

      this.dataService.getSnapshot(id)
        .subscribe(
          (snapshot: Snapshot) => this.buildMarkets(snapshot),
          error => this.buildErrorPage(error)
        );
    });
  }

  buildMarkets(data: Snapshot) {
    this.error = false;
    this.snapshot = data;
  }

  private buildErrorPage(error: any) {
    this.error = true;
    this.errorStatus = error.status;
    this.errorMessage = error.error.message;
  }
}
