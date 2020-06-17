import { Component, OnInit } from '@angular/core';
import {SnapshotMini} from '../../../model/SnapshotMini';
import {DataService} from '../../../service/data-service/data.service';

@Component({
  selector: 'app-snapshots',
  templateUrl: './snapshots.component.html',
  styleUrls: ['./snapshots.component.css']
})
export class SnapshotsComponent implements OnInit {

  snapshots: SnapshotMini[];

  constructor(private dataService: DataService) // injecting the http client in the constructor here
  { }

  ngOnInit(): void {
    this.dataService.getAllSnapshots()
      .subscribe(
        (data: SnapshotMini[]) => this.snapshots,
        error => console.log(error)
      );
  }

  /* Fixed the CORS issue so the GET request is successfully getting data from the api.
Right now all this does is print out a bunch of 'object Object' statements in html.
We need to actually get a list/array of SnapshotMini objects and print those out in the html using an ngFor.
Need to read more on how to do this.
* */
}
