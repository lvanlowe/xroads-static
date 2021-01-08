import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-deacon-detail',
  templateUrl: './deacon-detail.component.html',
  styleUrls: ['./deacon-detail.component.scss']
})
export class DeaconDetailComponent implements OnInit {

  deaconForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
