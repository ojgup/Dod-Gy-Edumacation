import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEnteredComponent } from './time-entered.component';

describe('TimeEnteredComponent', () => {
  let component: TimeEnteredComponent;
  let fixture: ComponentFixture<TimeEnteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEnteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEnteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
