import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Create } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Attendee } from 'src/app/models/attendee';
import { AppState } from 'src/app/state/app.state';
import { savingAttendee } from 'src/app/state/attendee.state';

@Component({
  selector: 'app-attendee-detail',
  templateUrl: './attendee-detail.component.html',
  styleUrls: ['./attendee-detail.component.scss']
})
export class AttendeeDetailComponent implements OnInit {

  @Output() attendeeAdded = new EventEmitter();

  attendeeForm: FormGroup;
  mask = '(000) 000-0000';
  canAdd: boolean;
  isSaving: boolean;
  attendeeSaved = false;
  attendee: Attendee;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.buildAttendeeForm(this.formBuilder);
    this.attendeeForm.markAsPristine();
    this.store.pipe(select(savingAttendee))
    .subscribe(saving => {
        console.log('issaving');
        this.isSaving = saving;
        if (!this.isSaving && this.attendeeSaved) {
          this.attendeeSaved = false;
          this.canAdd  = false;
          this.attendeeAdded.emit()
          // this.showCompletion = true;
        }
      });
    this.attendeeForm.valueChanges.subscribe(() => {this.enableAddButton(); } );
  }

  buildAttendeeForm(formBuilder: FormBuilder) {
    this.attendeeForm = formBuilder.group(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        cell: new FormControl(),
        email: new FormControl('', [Validators.email]),
        isDeacon: new FormControl(false)
      }
    );
  }

  clickAdd(){
    this.attendee = {...this.attendeeForm.value};

    console.log(this.attendee);
    this.attendeeForm.markAsPristine();
    this.store.dispatch(new Create(Attendee, this.attendee));
    this.attendeeSaved = true;
  }

  clearForm(){}

  enableAddButton() {
    if (this.attendeeForm.valid && !this.attendeeForm.errors) {
      this.canAdd = true;
    } else {
      this.canAdd = false;
    }
  }
}
