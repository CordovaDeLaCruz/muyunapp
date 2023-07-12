import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-modal-finished-session',
  templateUrl: './modal-finished-session.component.html',
  styleUrls: ['./modal-finished-session.component.scss']
})
export class ModalFinishedSessionComponent implements OnInit {
  message: string = null
  constructor(
    public dialogRef: MatDialogRef<ModalFinishedSessionComponent>,
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
