import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { isDeaconRole } from 'src/app/state/user-info.state';

@Component({
  selector: 'app-deacon-dashboard',
  templateUrl: './deacon-dashboard.component.html',
  styleUrls: ['./deacon-dashboard.component.scss']
})
export class DeaconDashboardComponent implements OnInit {

  deaconDashboardForm: FormGroup;
  isDeacon$: Observable<boolean>;
  canAdd: boolean;
  canCancel: boolean;
  displayDetails: boolean;
  diaconateid: string;

  constructor(private formBuilder: FormBuilder,private store: Store<AppState>) { }


  ngOnInit() {
    this.isDeacon$ = this.store.pipe(select(isDeaconRole));
    this.canAdd = true;
  }

  clickAdd() {
    this.canCancel = true;
    this.displayDetails = true;
    this.canAdd = false;
  }

  clickCancel() {
    this.canAdd = true;
    this.displayDetails = false;
  }

  showDetails(id: string){
    this.canCancel = true;
    this.displayDetails = true;
    this.canAdd = false;
    this.diaconateid = id;
  }
}
