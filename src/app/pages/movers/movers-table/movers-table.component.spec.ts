import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoversTableComponent } from './movers-table.component';

describe('MoversTableComponent', () => {
  let component: MoversTableComponent;
  let fixture: ComponentFixture<MoversTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoversTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoversTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
