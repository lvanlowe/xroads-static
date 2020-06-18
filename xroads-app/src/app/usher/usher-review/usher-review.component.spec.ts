import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsherReviewComponent } from './usher-review.component';

describe('UsherReviewComponent', () => {
  let component: UsherReviewComponent;
  let fixture: ComponentFixture<UsherReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsherReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsherReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
