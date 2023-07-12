import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Select, Store } from '@ngxs/store';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  registerForm: FormGroup;
  showSpinner: boolean = false;
  currentYear = new Date().getFullYear();


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly _authService: AuthService,
    private _snackBar: SnackbarComponent,
    private store: Store
  ) {
    this.registerForm = this.fb.group({
      username_email: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  async submit() {
    localStorage.clear();

    let { username_email, password } = this.registerForm.value;

    username_email = username_email
      .trim()
      .replace(/\s/g, '')
      .replace(/\t/g, '');
    password = password.trim().replace(/\t/g, '');

    if (username_email === '' || username_email === null) {
      this._snackBar.showErrorSnackbar(
        'Ingrese por favor su correo o su usuario'
      );
      return;
    }
    if (password === '' || password === null) {
      this._snackBar.showErrorSnackbar('Ingrese su contraseña');
      return;
    }
    try {
      this.showSpinner = true;
      const response = await this._authService.signInWithPassword({
        username_email,
        password,
      });
      console.log(response);

      this._snackBar.showMessageSnackbar('Ha iniciado su sesión');

      localStorage.setItem('fullName', response.firstName);
      this._authService.storeToken(response.token);

      if (response['forcePassword']) {
        localStorage.setItem('forcePassword', JSON.stringify(true));
        this.router.navigateByUrl(
          `auth/forgot-password?token=${response.token}`
        );
        this.showSpinner = false;
      } else {
        await this._authService.storeToken(response.token);
        localStorage.setItem('idUser', JSON.stringify(response.id));
        this.router.navigateByUrl('/main');
        this.showSpinner = false;
      }
    } catch (error: any) {
      this.showSpinner = false;
      if (error.error.error) {
        this._snackBar.showErrorSnackbar(error.error.error.message);
      } else {
        this._snackBar.showErrorSnackbar(
          'Hubo un error con el inicio de sesión, por favor vuelva a intentarlo'
        );
      }
    }
  }
  goToForgotPass() {
    this.router.navigate(['auth/forgot-password']);
  }
}
