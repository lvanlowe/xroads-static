import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildAttendeeForm(this.formBuilder);
    this.attendeeForm.markAsPristine();
    this.canAdd = false;
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
    this.attendeeAdded.emit()
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
