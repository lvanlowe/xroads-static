import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadAll, SelectByKey } from '@briebug/ngrx-auto-entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/models/attendee';
import { UserInfo } from 'src/app/models/user-info';
import { AppState } from 'src/app/state/app.state';
import { allAttendees, loadedAttendee, loadingAttendee, savedAttendee } from 'src/app/state/attendee.state';
import { currentUserInfo, isDeaconRole } from 'src/app/state/user-info.state';

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
  userInfo: UserInfo;

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

      this.store.pipe(select(currentUserInfo))
      .subscribe(user => {
        this.userInfo = user;})
      if ( this.userInfo != null) {
        this.isDeacon$ = this.store.pipe(select(isDeaconRole));
      }
  }

  editHandler({sender, rowIndex, dataItem}){
    this.store.dispatch(new SelectByKey(Attendee, dataItem.id ));
    this.attendeeEdited.emit(dataItem.id);
  }

  // reload(){
  //   this.view = this.store.pipe(select(allAttendees));
  // }
}
