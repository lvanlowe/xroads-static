import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadAll } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/models/attendee';
import { AppState } from 'src/app/state/app.state';
import { deaconAttendees, loadedAttendee, loadingAttendee } from 'src/app/state/attendee.state';

@Component({
  selector: 'app-deacon-detail',
  templateUrl: './deacon-detail.component.html',
  styleUrls: ['./deacon-detail.component.scss']
})
export class DeaconDetailComponent implements OnInit {

  public listMonths: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public listYears: Array<number> = [2021, 2022];
  deaconList$: Observable<Attendee[]>;
  selectedDeacon: Attendee;
  isLoadingAttendee: boolean;
  deaconForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {

    this.buildDeaconForm(this.formBuilder);
    this.deaconForm.markAsPristine();

    this.store.pipe(select(loadedAttendee)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(new LoadAll(Attendee));
      }
      else {
        this.deaconList$ = this.store.pipe(select(deaconAttendees));
      }
    });

    this.store.pipe(select(loadingAttendee))
    .subscribe(loading => {
      this.isLoadingAttendee = loading;
      if (!loading) {
        this.deaconList$ = this.store.pipe(select(deaconAttendees));
      }
    });


  }

  buildDeaconForm(formBuilder: FormBuilder) {
    this.deaconForm = formBuilder.group(
      {
        month: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
        deacon: new FormControl(null, Validators.required),
      }
    );
  }

  public selectionDeacon(value: Attendee): void {

  }
}
