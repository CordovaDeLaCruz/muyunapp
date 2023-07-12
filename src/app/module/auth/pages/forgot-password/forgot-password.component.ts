import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { isInvalid } from 'src/app/shared/helpers/custom-validation/validators-messages/validators-messages.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  username_email: string = '';
  currentYear = new Date().getFullYear();

  constructor(
    private _snackBar: SnackbarComponent,
    private readonly _authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {}

  backToAuth() {
    this.router.navigate(['auth']);
  }
  async submit() {
    try {
      if (this.username_email === null || this.username_email == '') {
        this._snackBar.showErrorSnackbar(
          'Ingrese su correo para cambiar la contraseña'
        );
        return;
      }
      this._authService
        .forgotPassword({
          email: this.username_email,
        })
        .subscribe((response) => {
          console.log(response);
          if (response['data'].success) {
            this._snackBar.showMessageSnackbar(
              'Se le enviado un mensaje de confirmación a su correo para el cambio de contraseña'
            );
            this.backToAuth();
          }
        });
    } catch (error: any) {
      if (error.statusCode == 401) return;

      this._snackBar.showErrorSnackbar(error.error.response.error.messageUser);
    }
  }

  validationRegister(_ngForm: any): boolean {
    if (isInvalid(_ngForm)) {
      return true;
    } else return false;
  }
}
