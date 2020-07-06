import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { isUsherRole } from 'src/app/state/user-info.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usher-review',
  templateUrl: './usher-review.component.html',
  styleUrls: ['./usher-review.component.scss']
})
export class UsherReviewComponent implements OnInit {

  isUsher$: Observable<boolean>;

  constructor( private store: Store<AppState>) {}

  async  ngOnInit() {

   this.isUsher$ = this.store.pipe(select(isUsherRole));
  }


}
