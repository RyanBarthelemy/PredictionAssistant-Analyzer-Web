import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotMiniTableComponent } from './snapshot-mini-table.component';

describe('SnapshotMiniTableComponent', () => {
  let component: SnapshotMiniTableComponent;
  let fixture: ComponentFixture<SnapshotMiniTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnapshotMiniTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotMiniTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
