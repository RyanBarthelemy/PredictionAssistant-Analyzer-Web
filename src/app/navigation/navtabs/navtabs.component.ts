import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navtabs',
  templateUrl: './navtabs.component.html',
  styleUrls: ['./navtabs.component.css']
})
export class NavtabsComponent implements OnInit {
  navLinks: any[];

  constructor() {
    this.navLinks = [
      {
        label: 'Home',
        link: '/',
        index: 0
      }, {
        label: 'Latest Market Info',
        link: '/snapshots/latest',
        index: 1
      }, {
        label: 'Snapshots History',
        link: '/snapshots',
        index: 2
      },
      {
        label: 'Current Movers',
        link: '/movers',
        index: 3
      },
      {
        label: 'Tracked Markets_nyi',
        link: '/',
        index: 4
      },
    ];
  }

  ngOnInit(): void {
  }

}
