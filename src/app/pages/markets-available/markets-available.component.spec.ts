import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketsAvailableComponent } from './markets-available.component';

describe('MarketsAvailableComponent', () => {
  let component: MarketsAvailableComponent;
  let fixture: ComponentFixture<MarketsAvailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketsAvailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketsAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
