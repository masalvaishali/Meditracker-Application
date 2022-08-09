import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctInsightsComponent } from './doct-insights.component';

describe('DoctInsightsComponent', () => {
  let component: DoctInsightsComponent;
  let fixture: ComponentFixture<DoctInsightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctInsightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
