import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulancesNearbyComponent } from './ambulances-nearby.component';

describe('AmbulancesNearbyComponent', () => {
  let component: AmbulancesNearbyComponent;
  let fixture: ComponentFixture<AmbulancesNearbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbulancesNearbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulancesNearbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
