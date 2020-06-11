import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SnapshotMiniList} from './SnapshotInterfaces';

@Component({
  selector: 'app-snapshots',
  templateUrl: './snapshots.component.html',
  styleUrls: ['./snapshots.component.css']
})
export class SnapshotsComponent implements OnInit {

  snapshots: SnapshotMiniList;

  constructor(private httpClient: HttpClient) // injecting the http client in the constructor here
  { }

  ngOnInit(): void { // todo: create an http service that handles all requests and just returns the object(s) that components needs
    console.log('in ngOnInit for Snapshot component. Making HTTP GET request');
    this.httpClient.get<SnapshotMiniList>('http://localhost:8080/api/snapshots/').subscribe((data: SnapshotMiniList) => {
      this.snapshots = data;
      console.log('made request');
    });
  }

}
