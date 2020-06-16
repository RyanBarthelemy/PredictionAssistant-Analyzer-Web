import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketsTableComponent } from './markets-table.component';

describe('MarketsTableComponent', () => {
  let component: MarketsTableComponent;
  let fixture: ComponentFixture<MarketsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
