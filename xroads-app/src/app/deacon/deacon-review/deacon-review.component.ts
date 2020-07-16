import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { isDeaconRole } from 'src/app/state/user-info.state';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { allDeacons } from 'src/app/state/deacon.state';
import { Deacon } from 'src/app/models/deacon';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-deacon-review',
  templateUrl: './deacon-review.component.html',
  styleUrls: ['./deacon-review.component.scss']
})
export class DeaconReviewComponent implements OnInit {

  isDeacon$: Observable<boolean>;
  view: Observable<Deacon[]>;
  deacons: Deacon[];
  gridDataResult: GridDataResult;
  formGroup: FormGroup;


  constructor( private store: Store<AppState>) {}

  ngOnInit() {
    this.isDeacon$ = this.store.pipe(select(isDeaconRole));
    this.store.pipe(select(allDeacons)).subscribe(data => {
      this.deacons = data;
      this.gridDataResult = {data: this.deacons, total: this.deacons.length};
    });

    // this.view = this.store.pipe(select(allDeacons));

  //   this.formGroup = new FormGroup({
  //     'ProductID': new FormControl(dataItem.ProductID),
  //     'ProductName': new FormControl(dataItem.ProductName, Validators.required),
  //     'UnitPrice': new FormControl(dataItem.UnitPrice),
  //     'UnitsInStock': new FormControl(
  //             dataItem.UnitsInStock,
  //             Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
  //     'Discontinued': new FormControl(dataItem.Discontinued)
  // });
  }

}
