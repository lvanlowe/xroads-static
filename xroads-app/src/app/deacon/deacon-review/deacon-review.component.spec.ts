import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaconReviewComponent } from './deacon-review.component';

describe('DeaconReviewComponent', () => {
  let component: DeaconReviewComponent;
  let fixture: ComponentFixture<DeaconReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeaconReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeaconReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
