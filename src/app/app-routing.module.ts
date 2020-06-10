/* https://angular.io/guide/router */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {SnapshotsComponent} from './pages/snapshots/snapshots.component';
import {MarketsAvailableComponent} from './pages/markets-available/markets-available.component';
import {MarketDataComponent} from './pages/market-data/market-data.component';
import {ContractHistoryComponent} from './pages/contract-history/contract-history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'snapshots', component: SnapshotsComponent },
  { path: 'snapshots/:hashId', component: MarketsAvailableComponent },
  { path: 'markets/:mid', component: MarketDataComponent },
  { path: 'markets/:mid/contracts/:cid', component: ContractHistoryComponent },
  { path: 'markets', redirectTo: 'markets/latest', pathMatch: 'full' },
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
