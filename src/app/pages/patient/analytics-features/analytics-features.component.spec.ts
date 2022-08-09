import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsFeaturesComponent } from './analytics-features.component';

describe('AnalyticsFeaturesComponent', () => {
  let component: AnalyticsFeaturesComponent;
  let fixture: ComponentFixture<AnalyticsFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});