import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDataService, User } from '../../services/user-data.service';
import { UserProfile } from '../../constants/user.constants';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SnackbarComponent } from '../../../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from 'src/app/shared/components/snackbar-error/snackbar.error.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalSuccessComponent } from 'src/app/shared/components/modal-success/modal-success.component';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss'],
})
export class UserMainComponent implements OnInit {
  profileList = [
    {
      name: 'Todos',
      value: null,
    },
    ...UserProfile,
  ];

  myId = null;

  users: User[] = [];
  displayedColumns: string[] = [
    'code',
    'profile',
    'firstname',
    'lastname',
    'email',
    'actions',
  ];

  usersLength: number = 0;
  clickedRows = null;

  filterField = new FormControl('');
  filterRole = new FormControl(null);

  page = 1;
  totalPages = 0;
  pages = [];

  filters: any = {
    page: 1,
    limit: 10,
  };

  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private userService: UserService,
    private _snackbar: SnackbarComponent,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {


    // this.userDataService.getUsers().subscribe((users) => {
    //   this.users = users;
    // });
    // this.usersLength = this.userDataService.getUsersLength();
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users.data;
      this.usersLength = users.total;
      this.totalPages = users.pages;
      this.pages = [];
      for (let index = 0; index < this.totalPages; index++) {
        this.pages.push(index + 1);
      }
    });

    this.myId = localStorage.getItem('idUser');

    this.filterRole?.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap((value) => {
          this.filters = {
            ...this.filters,
            role: value,
          };
          return this.userService.getUsers(this.filters);
        })
      )
      .subscribe((users) => {
        if (users.error) {
          this._snackbar.showErrorSnackbar(users.error.error.messageUser);

          return;
        }
        this.users = users.data;
        this.usersLength = users.total;
        this.totalPages = users.pages;
        this.pages = [];
        for (let index = 0; index < this.totalPages; index++) {
          this.pages.push(index + 1);
        }
      });

    this.filterField?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) => {
          this.filters = {
            ...this.filters,
            text: value,
          };
          return this.userService.getUsers(this.filters);
        })
      )
      .subscribe((users) => {
        this.users = users.data;
        this.usersLength = users.total;
        this.totalPages = users.pages;
        this.pages = [];
        for (let index = 0; index < this.totalPages; index++) {
          this.pages.push(index + 1);
        }
      });
  }

  getUserProfileLabel(profileValue: string) {
    return UserProfile.find((t) => t.value == profileValue)?.name;
  }

  detailUser(user: User) {
    this.userDataService.setSelectedUser(user);
    this.router.navigate(['/user/review-user']);
  }

  onPageEvent(event: any) {
    this.page = event;
    this.filters.page = event;

    this.userService.getUsers(this.filters).subscribe((users) => {
      this.users = users.data;
      this.usersLength = users.total;
      this.totalPages = users.pages;
      this.pages = [];
      for (let index = 0; index < this.totalPages; index++) {
        this.pages.push(index + 1);
      }
    });
  }

  openModalDelete(userId: number) {
    var message = '¿Estás seguro de eliminar el usuario?';
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      disableClose: true,
      autoFocus: false,
      width: '500px',
      height: '270px',
      data: {
        message,
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) return;
      this.userService
        .deleteUser(userId)
        .pipe(
          switchMap((value) => {
            return this.userService.getUsers(this.filters);
          })
        )
        .subscribe(
          (res) => {
            // this.loadUsers(this.page, this.filters);
            this.users = res.data;
            this.usersLength = res.total;
            this.totalPages = res.pages;
            this.pages = [];
            for (let index = 0; index < this.totalPages; index++) {
              this.pages.push(index + 1);
            }

            let messagePost = 'eliminaron';

            this.dialog.open(ModalSuccessComponent, {
              disableClose: true,
              autoFocus: false,
              width: '500px',
              height: '300px',
              data: {
                message: messagePost,
              },
            });
          },
          (error) => {
            this._snackBar.openFromComponent(SnackbarErrorComponent, {
              duration: 2500,
              data: {
                message:
                  'Hubo un error al eliminar los usuarios, por favor inténtelo nuevamente',
              },
              panelClass: ['error-snackbar'],
            });
          }
        );
    });
  }
}
