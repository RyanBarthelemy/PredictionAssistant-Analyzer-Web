import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SnapshotMini} from '../../../../model/SnapshotMini';
import {HttpClient} from '@angular/common/http';
import {SnapshotMiniDisplayable} from '../../../../model/SnapshotMiniDisplayable';

@Component({
  selector: 'app-snapshot-mini-table',
  templateUrl: './snapshot-mini-table.component.html',
  styleUrls: ['./snapshot-mini-table.component.css']
})
export class SnapshotMiniTableComponent implements OnInit {
  displayedColumns: string[] = ['Snapshot_Id', 'Timestamp', 'Markets_Info', 'As_JSON'];
  displayableSnapshotMiniArr: SnapshotMiniDisplayable[];
  dataSource = new MatTableDataSource<SnapshotMiniDisplayable>(this.displayableSnapshotMiniArr);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  snapshots: SnapshotMini[];

  constructor(private httpClient: HttpClient) // injecting the http client in the constructor here
  { }

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/api/snapshots/').subscribe((data: SnapshotMini[]) => {
      this.snapshots = data;
      this.displayableSnapshotMiniArr = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.snapshots.length; i++) {
        const smd = new SnapshotMiniDisplayable(
          this.snapshots[i].hashID,
          this.snapshots[i].timestampDisplay,
          '/snapshots/' + this.snapshots[i].hashID,
          'localhost:8080/api/snapshots/' + this.snapshots[i].hashID
        );
        if (this.displayableSnapshotMiniArr === undefined){
          console.log('displayableSnapshotMiniArr is undef');
        }
        // console.log('adding SnapshotMiniDisplayable to array:');
        // console.log(smd);
        this.displayableSnapshotMiniArr.push(smd);
      }
      console.log(this.displayableSnapshotMiniArr);
      this.dataSource = new MatTableDataSource<SnapshotMiniDisplayable>(this.displayableSnapshotMiniArr);
      this.dataSource.paginator = this.paginator;
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
