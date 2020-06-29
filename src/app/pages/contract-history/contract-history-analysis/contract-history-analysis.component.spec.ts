import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractHistoryAnalysisComponent } from './contract-history-analysis.component';

describe('ContractHistoryAnalysisComponent', () => {
  let component: ContractHistoryAnalysisComponent;
  let fixture: ComponentFixture<ContractHistoryAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractHistoryAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractHistoryAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
