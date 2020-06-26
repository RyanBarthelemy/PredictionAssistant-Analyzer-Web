import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractHistoryChartBuyYesComponent } from './contract-history-chart-buy-yes.component';

describe('ContractHistoryChartBuyYesComponent', () => {
  let component: ContractHistoryChartBuyYesComponent;
  let fixture: ComponentFixture<ContractHistoryChartBuyYesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractHistoryChartBuyYesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractHistoryChartBuyYesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
