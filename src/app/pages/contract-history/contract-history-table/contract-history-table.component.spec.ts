import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractHistoryTableComponent } from './contract-history-table.component';

describe('ContractHistoryTableComponent', () => {
  let component: ContractHistoryTableComponent;
  let fixture: ComponentFixture<ContractHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractHistoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
