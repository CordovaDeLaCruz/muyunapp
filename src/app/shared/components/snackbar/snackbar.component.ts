import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  private actionButtonLabel: string = 'Aceptar';
  private action: boolean = true;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private timeView = 4500;

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  showMessageSnackbar(message: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.timeView;
    config.panelClass = ['confirmationPanel'];
    this.snackBar.open(
      message,
      this.action ? this.actionButtonLabel : undefined,
      config
    );
  }

  showErrorSnackbar(message: string) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.timeView;
    config.panelClass = ['errorSnackBar'];
    this.snackBar.open(
      message,
      this.action ? this.actionButtonLabel : undefined,
      config
    );
  }
}
