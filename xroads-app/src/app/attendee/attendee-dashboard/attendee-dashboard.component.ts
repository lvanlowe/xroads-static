import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { isAdminRole, isDeaconRole } from 'src/app/state/user-info.state';

@Component({
  selector: 'app-attendee-dashboard',
  templateUrl: './attendee-dashboard.component.html',
  styleUrls: ['./attendee-dashboard.component.scss']
})
export class AttendeeDashboardComponent implements OnInit {

  canAdd: boolean;
  canCancel: boolean;
  displayDetails: boolean;
  isAdmin$: Observable<boolean>;
  attendeeDashboardForm: FormGroup;
  attendeeid: string;

  constructor(private formBuilder: FormBuilder,private store: Store<AppState>) { }

  ngOnInit() {
    this.buildAttendeeForm(this.formBuilder);
    this.attendeeDashboardForm.markAsPristine();
    this.isAdmin$ = this.store.pipe(select(isDeaconRole));
    this.canAdd = true;
  }

  buildAttendeeForm(formBuilder: FormBuilder) {
    this.attendeeDashboardForm = formBuilder.group(
      {

      }
    );
  }

  clickAdd(){
    this.canCancel = true;
    this.displayDetails = true;
    this.canAdd = false;
    this.attendeeid = null;
  }

  clickCancel(){
    this.canAdd = true;
    this.displayDetails = false;
  }

  hideDetails(){
    this.canCancel = false;
    this.displayDetails = false;
    this.canAdd = true;
    this.attendeeid = null;
  }

  showDetails(id){
    this.canCancel = true;
    this.displayDetails = true;
    this.canAdd = false;
    this.attendeeid = id;
  }

}
