import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store'

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.scss']
})
export class ModalSuccessComponent implements OnInit {
  message: string = null
  constructor(
    public dialogRef: MatDialogRef<ModalSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.message = data.message
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close()
  }
}
