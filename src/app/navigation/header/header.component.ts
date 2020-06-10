import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() SideNavigationToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /* In header.component.html we have a button that, when clicked, should toggle open/close our nav bar.
  * We add an attribute directive called '(click)' to the button that tell Angular to call this method - navButtonClicked_ToggleSideNav().
  * This method takes the custom event we created 'SideNavigationToggle' and calls emit()
  * This emit tells whoever is listening to this event that the event fired.
  * In app.component.html we have our mat-sidenav-content selector with 'app-header' that is listening for this event.
  * When it hears this event, it calls 'sidenav.toggle()' which will open/close the nav bar.
  *   //The sidenav object from sidenav.toggle is from 'mat-sidenav' in app.component.html. Note the '#sidenav' which names the object. */
  navButtonClicked_ToggleSidenav() {
    this.SideNavigationToggle.emit();
  }
}
