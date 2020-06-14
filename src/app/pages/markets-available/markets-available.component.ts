import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-markets-available',
  templateUrl: './markets-available.component.html',
  styleUrls: ['./markets-available.component.css']
})
export class MarketsAvailableComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // stuff here
      const id = this.route.snapshot.paramMap.get('hashId');
      console.log('the id from url = ' + id);

      if (id === 'latest'){
        // return market info for latest snapshot  -- http://localhost:8080/api/snapshots/latest
        console.log('Getting markets info for most recent snapshot');
      }
      else{
        // get market info for snapshot with given id
        // if it does not return a status code 200, then we figure out what to do.
      }
    });
  }

}
