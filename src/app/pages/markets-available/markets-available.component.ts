import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Snapshot} from '../../../model/Snapshot';

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

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = this.route.snapshot.paramMap.get('hashId');
      console.log('the id from url = ' + id);

      // get the data for this snapshot id from the api page
      console.log('making request to http://localhost:8080/api/snapshots/' + id);
      this.httpClient
        .get('http://localhost:8080/api/snapshots/' + id)
        .subscribe(
          (data: Snapshot) => this.buildMarkets(data),
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
