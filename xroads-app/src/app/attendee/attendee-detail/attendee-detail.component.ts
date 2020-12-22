import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attendee-detail',
  templateUrl: './attendee-detail.component.html',
  styleUrls: ['./attendee-detail.component.scss']
})
export class AttendeeDetailComponent implements OnInit {
  attendeeForm: FormGroup;
  mask = '(000) 000-0000';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildAttendeeForm(this.formBuilder);
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
}
