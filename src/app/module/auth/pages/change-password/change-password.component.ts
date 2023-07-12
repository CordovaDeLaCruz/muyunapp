import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  hide: boolean = true;
  hide2: boolean = true;
  repeatPassword: string = '';
  isEmailValid: boolean = false;
  forcePassword: boolean = false;
  token: any = null;
  password: string = '';
  currentYear = new Date().getFullYear();

  constructor(
    private activeRoute: ActivatedRoute,
    private _snackBar: SnackbarComponent,
    private router: Router,
    private readonly _authService: AuthService,
  ) {
    this.activeRoute.queryParams.subscribe((params) => {
      this.token = params.token;
    });
  }

  ngOnInit(): void {
    if (!this.token) {
      this.backToAuth()
      return
    }

    console.log(this.token);
    this.isEmailValid = true;
    var forcePassword = localStorage.getItem('forcePassword');
    console.log(forcePassword);
    if (forcePassword) {
      this.forcePassword = true;
    }
  }
  backToAuth() {
    this.router.navigate(['auth']);
  }
  async changePassword() {
    try {
      if (this.password === null || this.password == '') {
        this._snackBar.showErrorSnackbar('Ingrese una contraseña');
        return;
      }
      if (this.repeatPassword === null || this.repeatPassword == '') {
        this._snackBar.showErrorSnackbar(
          'Repetir la contraseña en obligatoria'
        );
        return;
      }
      if (this.password !== this.repeatPassword) {
        this._snackBar.showErrorSnackbar('Las contraseñas no coinciden');
        return;
      }
      const response = await this._authService.changePassword({
        token: this.token,
        password: this.password,
      });
      // if (response["data"].success) {
      this._snackBar.showMessageSnackbar(
        'Se ha cambiado la contraseña con éxito'
      );
      localStorage.clear();
      this.backToAuth();
      // }
    } catch (error: any) {
      if (error.statusCode == 401) return;
      this._snackBar.showErrorSnackbar(error.error.response.error.messageUser);
    }
    // const response = this._authService.forgotPassword(this.email)
  }
}
