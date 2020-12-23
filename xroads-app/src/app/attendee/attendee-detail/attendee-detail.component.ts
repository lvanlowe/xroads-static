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
    this.canAdd = true;
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
}
