import { Component, Inject, OnInit } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'snackbar-error',
  templateUrl: './snackbar.error.component.html',
  styleUrls: ['./snackbar.error.component.scss']
})
export class SnackbarErrorComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
