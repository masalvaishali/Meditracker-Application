import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsNearbyComponent } from './hospitals-nearby.component';

describe('HospitalsNearbyComponent', () => {
  let component: HospitalsNearbyComponent;
  let fixture: ComponentFixture<HospitalsNearbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalsNearbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsNearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
