import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoversComponent } from './movers.component';

describe('MoversComponent', () => {
  let component: MoversComponent;
  let fixture: ComponentFixture<MoversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoversComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
