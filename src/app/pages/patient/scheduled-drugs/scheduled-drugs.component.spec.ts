import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledDrugsComponent } from './scheduled-drugs.component';

describe('ScheduledDrugsComponent', () => {
  let component: ScheduledDrugsComponent;
  let fixture: ComponentFixture<ScheduledDrugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledDrugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
