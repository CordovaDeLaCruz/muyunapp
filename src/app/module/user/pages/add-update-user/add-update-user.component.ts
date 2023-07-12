import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { DocumentTypeList } from '../../constants/documentType.constants';
import { Profile, UserProfile } from '../../constants/user.constants';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss'],
})
export class AddUpdateUserComponent implements OnInit {
  showSpinner = false
  profileList = UserProfile;
  profileValueList = Profile;

  imageUrl = null;
  image = null;

  documentTypeList = DocumentTypeList;
  form: FormGroup;
  checkPhotoFormControl = new FormControl(false);

  userId = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private _snackBar: SnackbarComponent
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.userId = params['id'];
    });

    this.form = this.fb.group({
      role: [null, [Validators.required]],
      code: [null],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      documentType: ['DNI'],
      documentNumber: [''],
      email: [''],
      username: [''],
      password: [''],
      experience: [''],
      description: [''],
    });

    this.form.get('role')?.valueChanges.subscribe((role) => {
      this.form.get('documentType')?.clearValidators();
      this.form.get('documentNumber')?.clearValidators();
      this.form.get('email')?.clearValidators();
      this.form.get('username')?.clearValidators();
      this.form.get('password')?.clearValidators();
      this.form.get('experience')?.clearValidators();
      this.form.get('description')?.clearValidators();

      this.form.get('documentType')?.updateValueAndValidity();
      this.form.get('documentNumber')?.updateValueAndValidity();
      this.form.get('email')?.updateValueAndValidity();
      this.form.get('username')?.updateValueAndValidity();
      this.form.get('password')?.updateValueAndValidity();
      this.form.get('experience')?.updateValueAndValidity();
      this.form.get('description')?.updateValueAndValidity();

      this.form.get('firstName')?.setValidators([Validators.required]);
      this.form.get('lastName')?.setValidators([Validators.required]);

      switch (role) {
        case Profile.Admin:
          this.form.get('documentType')?.setValidators([Validators.required]);
          this.form.get('documentNumber')?.setValidators([Validators.required]);
          this.form.get('email')?.setValidators([Validators.required]);
          this.form.get('username')?.setValidators([Validators.required]);

          if (!this.userId) {
            this.form.get('password')?.setValidators([Validators.required]);
          }
          break;

        case Profile.Guide:
          this.form.get('documentType')?.setValidators([Validators.required]);
          this.form.get('documentNumber')?.setValidators([Validators.required]);
          this.form.get('experience')?.setValidators([Validators.required]);
          this.form.get('description')?.setValidators([Validators.required]);
          // this.form.get('photoUrl')?.setValidators([Validators.required])
          break;

        case Profile.Passenger:
          this.form.get('code')?.setValidators([Validators.required]);

          if (this.userId) {
            this.form.get('email')?.setValidators([Validators.required]);
            this.form.get('username')?.setValidators([Validators.required]);
          }
          break;

        default:
          break;
      }
    });

    this.checkPhotoFormControl.valueChanges.subscribe((result) => {
      if (!result) {
        this.imageUrl = null;
        this.image = null;
      }
    });
  }

  ngOnInit(): void {
    if (!this.userId) return;
    this.showSpinner = true
    this.userService.getDetailedUser(this.userId).subscribe((user) => {
      this.form.patchValue({
        ...user,
      });
      this.form.get('role').disable()
      if (user.photoUrl) {
        this.checkPhotoFormControl.setValue(true);
        this.imageUrl = user.photoUrl;
      }
      this.showSpinner = false
    });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.image = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }


  removeImage(){
    this.image = null;
    this.imageUrl = null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    //* Filtramos si no hay data demas en base al rol del usuario
    switch (this.form.get('role').value) {
      case Profile.Admin:
        this.imageUrl = null;
        this.image = null;
        this.form.patchValue({
          experience: null,
          description: null,
          code: null,
        });
        break;
      case Profile.Guide:
        this.form.patchValue({
          username: null,
          password: null,
          code: null,
        });
        break;

      case Profile.Passenger:
        this.imageUrl = null;
        this.image = null;
        this.form.patchValue({
          experience: null,
          description: null,
          documentType: null,
          documentNumber: null,
        });

        if (!this.userId) {
          this.form.patchValue({
            username: null,
            password: null,
            email: null,
          });
        }
        break;

      default:
        break;
    }

    //* Si es Edicion de usuario
    if (this.userId) {
      this.userService
        .updateUser(this.userId, this.form.getRawValue(), this.image, !this.checkPhotoFormControl.value)
        .subscribe((result) => {
          if (result.error) {
            this._snackBar.showErrorSnackbar(result.error.error.messageUser);
            this.isLoading = false;

            return;
          }

          this._snackBar.showMessageSnackbar(
            `Se ha actualizado al usuario ${
              this.form.get('firstName')!.value
            } ${this.form.get('lastName')!.value} con éxito`
          );
          this.router.navigateByUrl('/user');
          this.isLoading = false;
          return;
        });
    }
    //* Si es Creacion de usuario
    else {
      this.userService
        .createUser(this.form.getRawValue(), this.image)
        .subscribe((result) => {
          if (result.error) {
            this._snackBar.showErrorSnackbar(result.error.error.messageUser);
            this.isLoading = false;

            return;
          }else {
            this._snackBar.showErrorSnackbar('Ha ocurrido un error. Por favor intentelo más tarde');
          }

          this._snackBar.showMessageSnackbar(
            `Se ha creado al usuario ${this.form.get('firstName')!.value} ${
              this.form.get('lastName')!.value
            } con éxito`
          );
          this.router.navigateByUrl('/user');
          this.isLoading = false;
          return;
        });
    }
  }
}
