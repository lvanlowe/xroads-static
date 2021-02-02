import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Create, Update } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/models/attendee';
import { AppState } from 'src/app/state/app.state';
import { currentAttendee, savingAttendee } from 'src/app/state/attendee.state';

@Component({
  selector: 'app-attendee-detail',
  templateUrl: './attendee-detail.component.html',
  styleUrls: ['./attendee-detail.component.scss']
})
export class AttendeeDetailComponent implements OnInit {

  @Output() attendeeAdded = new EventEmitter();

  @Input() id: string;

  attendeeForm: FormGroup;
  mask = '(000) 000-0000';
  canSave: boolean;
  isSaving: boolean;
  attendeeSaved = false;
  attendee: Attendee;
  attendee$: Observable<Attendee>;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {
    this.buildAttendeeForm(this.formBuilder);
    this.attendeeForm.markAsPristine();
    this.FillInForm();
    this.store.pipe(select(savingAttendee))
    .subscribe(saving => {
        console.log('issaving');
        this.isSaving = saving;
        if (!this.isSaving && this.attendeeSaved) {
          this.attendeeSaved = false;
          this.canSave  = false;
          this.attendeeAdded.emit()
        }
      });

    this.attendeeForm.valueChanges.subscribe(() => {this.enableAddButton(); } );
  }

  private FillInForm() {
    if (this.id.length > 0) {
      console.log('viewing attendee');
      this.attendee$ = this.store.pipe(select(currentAttendee));
      this.attendee$.subscribe(results => { this.attendee = results; });
      this.attendeeForm.patchValue(this.attendee);
    }
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

  clickSave(){
    this.attendee = {...this.attendee, ...this.attendeeForm.value};

    console.log(this.attendee);
    this.attendeeForm.markAsPristine();
    if (this.attendee.id)
    {
      this.store.dispatch(new Update(Attendee, this.attendee));
    }
    else {
      this.store.dispatch(new Create(Attendee, this.attendee));
    }
    this.attendeeSaved = true;
  }

  clearForm(){
    this.attendeeForm.reset();
    this.FillInForm();
    this.attendeeForm.markAsPristine();
  }

  enableAddButton() {
    if (this.attendeeForm.valid && !this.attendeeForm.errors) {
      this.canSave = true;
    } else {
      this.canSave = false;
    }
  }
}
