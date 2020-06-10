import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SnapshotsComponent } from './pages/snapshots/snapshots.component';
import { MarketsAvailableComponent } from './pages/markets-available/markets-available.component';
import { MarketDataComponent } from './pages/market-data/market-data.component';
import { ContractHistoryComponent } from './pages/contract-history/contract-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './navigation/header/header.component';
import { NavtabsComponent } from './navigation/navtabs/navtabs.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {AppRoutingModule} from './app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SnapshotsComponent,
    MarketsAvailableComponent,
    MarketDataComponent,
    ContractHistoryComponent,
    HeaderComponent,
    NavtabsComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatTabsModule,
    MatListModule,
    MatButtonModule,
    /* See note at bottom */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/* Building this application with a responsive layout called Angular Flex Layout.
* Info can be found here: https://github.com/angular/flex-layout/wiki/Responsive-API
* How to setup: https://github.com/angular/flex-layout/wiki/Developer-Setup
*     https://github.com/angular/flex-layout/wiki/NPM-Installs */
