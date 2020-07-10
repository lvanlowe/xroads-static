import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { isNurseryRole } from 'src/app/state/user-info.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nursery-review',
  templateUrl: './nursery-review.component.html',
  styleUrls: ['./nursery-review.component.scss']
})
export class NurseryReviewComponent implements OnInit {

  isNursery$: Observable<boolean>;

  constructor( private store: Store<AppState>) {}

  ngOnInit() {
    this.isNursery$ = this.store.pipe(select(isNurseryRole));
  }

 }
