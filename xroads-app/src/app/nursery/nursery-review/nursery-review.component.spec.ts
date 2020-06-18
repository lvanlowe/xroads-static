import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseryReviewComponent } from './nursery-review.component';

describe('NurseryReviewComponent', () => {
  let component: NurseryReviewComponent;
  let fixture: ComponentFixture<NurseryReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseryReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseryReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
