import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDataChartBuyYesComponent } from './market-data-chart-buy-yes.component';

describe('MarketDataChartBuyYesComponent', () => {
  let component: MarketDataChartBuyYesComponent;
  let fixture: ComponentFixture<MarketDataChartBuyYesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketDataChartBuyYesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketDataChartBuyYesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
