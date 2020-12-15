import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { isDeaconRole } from 'src/app/state/user-info.state';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { allDeacons } from 'src/app/state/deacon.state';
import { Deacon } from 'src/app/models/deacon';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeaconCalendar } from 'src/app/models/deacon-calendar';
import { allDeaconCalendars } from 'src/app/state/deacon-calendar.state';

@Component({
  selector: 'app-deacon-review',
  templateUrl: './deacon-review.component.html',
  styleUrls: ['./deacon-review.component.scss']
})
export class DeaconReviewComponent implements OnInit {

  isDeacon$: Observable<boolean>;
  view: Observable<DeaconCalendar[]>;
  deacons: DeaconCalendar[];
  gridDataResult: GridDataResult;
  formGroup: FormGroup;

  private editedRowIndex: number;

  constructor( private store: Store<AppState>) {}

  ngOnInit() {
    this.isDeacon$ = this.store.pipe(select(isDeaconRole));
    // this.store.pipe(select(allDeacons)).subscribe(data => {
    //   this.deacons = data;
    //   this.gridDataResult = {data: this.deacons, total: this.deacons.length};
    // });
    this.view = this.store.pipe(select(allDeaconCalendars));
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

  public editHandler({sender, rowIndex, dataItem}) {
    this.closeEditor(sender);
    console.log(dataItem);
    this.formGroup = new FormGroup({
        year: new FormControl(dataItem.year, Validators.required),
        month: new FormControl(dataItem.month, Validators.required),
        name: new FormControl(dataItem.name, Validators.required),
        id: new FormControl(dataItem.id),
        deaconId: new FormControl(dataItem.deaconId, Validators.required),
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public cancelHandler({sender, rowIndex}) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({sender, rowIndex, formGroup, isNew}) {
    // const product: Product = formGroup.value;
    console.log(formGroup.value);
    console.log(isNew);
    // this.editService.save(product, isNew);

    sender.closeRow(rowIndex);
}
}
