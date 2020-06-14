import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SnapshotMini} from '../../../model/SnapshotMini';

@Component({
  selector: 'app-snapshots',
  templateUrl: './snapshots.component.html',
  styleUrls: ['./snapshots.component.css']
})
export class SnapshotsComponent implements OnInit {

  snapshots: SnapshotMini[];

  constructor(private httpClient: HttpClient) // injecting the http client in the constructor here
  { }

  ngOnInit(): void { // todo: create an http service that handles all requests and just returns the object(s) that components needs
  }

  /* Fixed the CORS issue so the GET request is successfully getting data from the api.
Right now all this does is print out a bunch of 'object Object' statements in html.
We need to actually get a list/array of SnapshotMini objects and print those out in the html using an ngFor.
Need to read more on how to do this.
* */
}
