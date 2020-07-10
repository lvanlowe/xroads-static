import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { isDeaconRole } from 'src/app/state/user-info.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deacon-review',
  templateUrl: './deacon-review.component.html',
  styleUrls: ['./deacon-review.component.scss']
})
export class DeaconReviewComponent implements OnInit {

  isDeacon$: Observable<boolean>;

  constructor( private store: Store<AppState>) {}

  ngOnInit() {
    this.isDeacon$ = this.store.pipe(select(isDeaconRole));
  }

}
