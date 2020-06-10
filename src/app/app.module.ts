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
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
