import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadAll } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/models/attendee';
import { AppState } from 'src/app/state/app.state';
import { allAttendees, loadedAttendee, loadingAttendee } from 'src/app/state/attendee.state';
import { isDeaconRole } from 'src/app/state/user-info.state';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.scss']
})
export class AttendeeListComponent implements OnInit {

  @Output() attendeeEdited = new EventEmitter();
  isDeacon$: Observable<boolean>;
  view: Observable<Attendee[]>;
  isLoadingAttendee: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(select(loadedAttendee)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(new LoadAll(Attendee));
      }
    });
    this.store.pipe(select(loadingAttendee))
      .subscribe(loading => {
        this.isLoadingAttendee = loading;
        this.view = this.store.pipe(select(allAttendees));
      });

    this.isDeacon$ = this.store.pipe(select(isDeaconRole));

  }

  editHandler({sender, rowIndex, dataItem}){
    this.attendeeEdited.emit(dataItem.id)
  }
}
