import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaconDetailComponent } from './deacon-detail.component';

describe('DeaconDetailComponent', () => {
  let component: DeaconDetailComponent;
  let fixture: ComponentFixture<DeaconDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeaconDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeaconDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
