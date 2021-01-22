import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeaconListComponent } from './deacon-list.component';

describe('DeaconListComponent', () => {
  let component: DeaconListComponent;
  let fixture: ComponentFixture<DeaconListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeaconListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeaconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
