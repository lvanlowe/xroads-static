import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Create, LoadAll, SelectByKey } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/models/attendee';
import { Diaconate } from 'src/app/models/diaconate';
import { AppState } from 'src/app/state/app.state';
import { currentAttendee, deaconAttendees, loadedAttendee, loadingAttendee } from 'src/app/state/attendee.state';
import { currentDiaconate } from 'src/app/state/diaconate.state';

@Component({
  selector: 'app-deacon-detail',
  templateUrl: './deacon-detail.component.html',
  styleUrls: ['./deacon-detail.component.scss']
})
export class DeaconDetailComponent implements OnInit {

  @Input() id: string;

  public listMonths: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public listYears: Array<number> = [];
  deaconList$: Observable<Attendee[]>;
  selectedDeacon: Attendee;
  isLoadingAttendee: boolean;
  canAdd: boolean
  diaconate: Diaconate
  attendee: Attendee;
  deaconForm: FormGroup;
  diaconate$: Observable<Diaconate>;
  attendee$: Observable<Attendee>;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit() {

    this.buildDeaconForm(this.formBuilder);
    this.deaconForm.markAsPristine();
    this.diaconate = new Diaconate;

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
    this.buildYearList();
    this.FillInForm();
    this.canAdd = false
    this.deaconForm.valueChanges.subscribe(() => {this.enableAddButton(); } );
  }

  private FillInForm() {
    if (this.id.length > 0) {
      this.diaconate$ = this.store.pipe(select(currentDiaconate));
      this.diaconate$.subscribe(results => { this.diaconate = results; });
      this.deaconForm.patchValue(this.diaconate);
      this.store.dispatch(new SelectByKey(Attendee, this.diaconate.attendeeId));
      this.attendee$ = this.store.pipe(select(currentAttendee));
      this.attendee$.subscribe(results => { this.attendee = results; });
      this.deaconForm.controls.deacon.setValue(this.attendee);
    }
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
    this.deaconForm.controls.deacon.setValue(value);
    this.diaconate.attendeeId = value.id;
    this.diaconate.name = value.name;
  }

  clickAdd() {
    this.diaconate = {...this.diaconate, ...this.deaconForm.value};
    this.deaconForm.markAsPristine();
    this.store.dispatch(new Create(Diaconate, this.diaconate));

  }

  clearForm(): void{

  }

  enableAddButton(): void {
    if (this.deaconForm.valid && !this.deaconForm.errors) {
      this.canAdd = true;
    } else {
      this.canAdd = false;
    }
  }

  buildYearList(): void {
    var currentYear = new Date().getFullYear();
    this.listYears.push(currentYear);
    this.listYears.push(currentYear + 1);
  }
}
