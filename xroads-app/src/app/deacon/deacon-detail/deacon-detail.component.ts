import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Create, LoadAll, SelectByKey, Update } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/models/attendee';
import { Diaconate } from 'src/app/models/diaconate';
import { AppState } from 'src/app/state/app.state';
import { currentAttendee, deaconAttendees, loadedAttendee, loadingAttendee } from 'src/app/state/attendee.state';
import { currentDiaconate, savingDiaconate } from 'src/app/state/diaconate.state';

@Component({
    selector: 'app-deacon-detail',
    templateUrl: './deacon-detail.component.html',
    styleUrls: ['./deacon-detail.component.scss']
})
export class DeaconDetailComponent implements OnInit {

    @Output() deaconSaved = new EventEmitter();

    @Input() id: string;

    public listMonths: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    public listYears: Array<number> = [];
    deaconList$: Observable<Attendee[]>;
    selectedDeacon: Attendee;
    isLoadingAttendee: boolean;
    canSave: boolean
    isSaving: boolean;
    dateFormat = 'MM/dd/yyyy HH:mm';
    diaconteSaved = false;
    diaconate: Diaconate
    attendee: Attendee;
    deaconForm: FormGroup;
    diaconate$: Observable<Diaconate>;
    attendee$: Observable<Attendee>;
    selectedMeeting: Date;
    public min: Date;
    public max: Date;

    constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

    ngOnInit() {

        this.buildDeaconForm(this.formBuilder);

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
        this.deaconForm.markAsPristine();
        this.store.pipe(select(savingDiaconate))
            .subscribe(saving => {
                this.isSaving == saving;
                if (!this.isSaving && this.diaconteSaved) {
                    this.canSave = false;
                    this.diaconteSaved = false;
                    this.deaconSaved.emit();
                }
            })
        this.canSave = false
        this.deaconForm.valueChanges.subscribe(() => { this.enableSaveButton(); });
    }

    private FillInForm() {
        if (this.id.length > 0) {
            this.diaconate$ = this.store.pipe(select(currentDiaconate));
            this.diaconate$.subscribe(results => { this.diaconate = results; });
            console.log(this.diaconate)
            this.deaconForm.patchValue(this.diaconate);
            if (this.diaconate.meetingDate !== null) {
                this.deaconForm.controls.meetingTime.setValue(new Date(this.diaconate.meetingDate))
            }
            this.store.dispatch(new SelectByKey(Attendee, this.diaconate.attendeeId));
            this.attendee$ = this.store.pipe(select(currentAttendee));
            this.attendee$.subscribe(results => { this.attendee = results; });
            this.deaconForm.controls.deacon.setValue(this.attendee);
            this.deaconForm.controls.meetingTime.enable();
            this.deaconForm.controls.meetingUrl.enable();
            this.min = new Date(this.diaconate.year, this.diaconate.month - 1, 1);
            this.max = new Date(this.diaconate.year, this.diaconate.month, 0);
        }
    }

    buildDeaconForm(formBuilder: FormBuilder) {
        this.deaconForm = formBuilder.group(
            {
                month: new FormControl('', Validators.required),
                year: new FormControl('', Validators.required),
                deacon: new FormControl(null, Validators.required),
                meetingTime: new FormControl({ value: null, disabled: true }),
                meetingUrl: new FormControl({ value: null, disabled: true }),
            },
            {
                validators: this.meetingValidator('meetingTime', 'meetingUrl')
            }
        );
    }

    public selectionDeacon(value: Attendee): void {
        this.deaconForm.controls.deacon.setValue(value);
        this.diaconate.attendeeId = value.id;
        this.diaconate.name = value.name;
    }

    clickSave() {
        this.diaconate = { ...this.diaconate, ...this.deaconForm.value };
        this.diaconate.newMeetingDate = this.deaconForm.controls.meetingTime.value;
        this.deaconForm.markAsPristine();
        if (this.diaconate.id) {
            this.store.dispatch(new Update(Diaconate, this.diaconate));
        }
        else {
            this.store.dispatch(new Create(Diaconate, this.diaconate));
        }
        this.diaconteSaved = true;
    }

    clearForm(): void {
        this.deaconForm.reset();
        this.deaconForm.patchValue(this.diaconate);
        this.attendee$.subscribe(results => { this.attendee = results; });
        this.deaconForm.controls.deacon.setValue(this.attendee);
        this.deaconForm.markAsPristine();
    }

    enableSaveButton(): void {
        this.deaconForm.controls['meetingUrl'].setErrors(null);
        this.deaconForm.controls['meetingTime'].setErrors(null);
        if (this.deaconForm.valid && !this.deaconForm.errors) {
            this.canSave = true;
        } else {
            if (this.deaconForm.errors.requireBoth) {
                this.deaconForm.controls['meetingTime'].markAsTouched();
                this.deaconForm.controls['meetingTime'].setErrors({ 'requireBoth': true });
                this.deaconForm.controls['meetingUrl'].markAsTouched();
                this.deaconForm.controls['meetingUrl'].setErrors({ 'requireBoth': true });
            }
            this.canSave = false;
        }
    }

    buildYearList(): void {
        var currentYear = new Date().getFullYear();
        this.listYears.push(currentYear);
        this.listYears.push(currentYear + 1);
    }


    public meetingValidator = (date: string, url: string): ValidatorFn => {
        return (formGroup: FormGroup): ValidationErrors | null => {
            const meetingTime = formGroup.controls[date].value;
            const meetingUrl = formGroup.controls[url].value;
            if ((meetingTime && meetingUrl) || (!meetingTime && !meetingUrl)) {
                return null;
            }
            return { requireBoth: true };
        }
    };
}
