import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SnackbarComponent } from '../../../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from 'src/app/shared/components/snackbar-error/snackbar.error.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalSuccessComponent } from 'src/app/shared/components/modal-success/modal-success.component';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { UserService } from 'src/app/module/user/services/user.service';
import { UserProfile } from 'src/app/module/user/constants/user.constants';
import { RouteService } from 'src/app/module/route/service/route.service';
import { TravelService } from '../../services/travel.service';
import { DatePipe } from '@angular/common'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-travel-main',
  templateUrl: './travel-main.component.html',
  styleUrls: ['./travel-main.component.scss'],
  providers: [
    DatePipe
  ]
})
export class TravelMainComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  travels: any[] = [];
  displayedColumns: string[] = [
    'recorrido',
    'passenger',
    'guide',
    'route',
    'date',
    'hour',
    'check',
    'identity_complete',
    'actions',
  ];

  travelLength: number = 0;
  clickedRows = null;

  // NewCode
  range = new FormGroup({
    date_start: new FormControl(null),
    date_end: new FormControl(null),
  });

  page = 1;
  totalPages = 0;
  pages = [];

  filters: any = {
    page: 1,
    limit: 10,
    guide_id: null,
    router_id: null,
    comple_checklist: null,
  };
  filtersUser: any = {
    page: 1,
    limit: 100,
    role: 'GUIDE'
  };
  filtersRoute: any = {
    page: 1,
    limit: 100,
    type_filter: 2
  };
  guidesList: any = [];
  routeList: any = [];
  travelList: any = [];
  constructor(
    private router: Router,
    private _snackbar: SnackbarComponent,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userService: UserService,
    private _routeService: RouteService,
    private _travelService: TravelService,
    public datepipe: DatePipe

  ) {
    this.range.get('date_start')?.valueChanges
    .subscribe( async (text) => {
      if (text && text != "") {
        this.filters = {
          ...this.filters,
          date_start: text
        }
        console.log('date_end',this.filters);
      }
    });
    this.range.get('date_end')?.valueChanges
    .subscribe( async (text) => {
      if (text && text != "") {
        this.filters = {
          ...this.filters,
          date_end: text
        }
        console.log('date_end',this.filters);
      }
    });
  }


  async ngOnInit() {
    await this.getUsers();
    await this.getViewRoutes();
    await this.getTravel();
  }

  async getTravel(){
    try {
      const response = await this._travelService.getViewTravel(this.filters);
      console.log(response);
      this.travelList = response["data"].data
      this.travelLength = response["data"].total;
      this.totalPages = response["data"].pages;
      this.pages = [];
      for (let index = 0; index < this.totalPages; index++) {
        this.pages.push(index + 1);
      }
    } catch (error) {
      console.log(error);

    }
  }


  async getUsers() {
    await this.userService.getUsers(this.filtersUser).subscribe(
      (data) => {
        this.guidesList = data["data"]
      },
      (err) => {
        console.log(err);
      }
    )
  }

  async getViewRoutes() {
    try {
      const response = await this._routeService.getViewRoutes(this.filters);
      this.routeList = response["data"]
      console.log(this.routeList);

    } catch (error) {
      console.log(error);
    }
  }

  async onSearchChange() {
    this.page = 1;
    this.filters.page = 1;
    await this.getTravel();
  }

  getUserProfileLabel(profileValue: string) {
    return UserProfile.find((t) => t.value == profileValue)?.name;
  }

  detailTravelSpecie(id) {
    this.router.navigate([`/travel/specie-detail/${id}`]);
  }

  async onPageEvent(event: any) {
    this.page = event;
    this.filters.page = event;
    await this.getTravel();
  }


  // onPageEvent(event: any) {
  //   this.page = event;
  //   this.filters.page = event;

  //   this.userService.getUsers(this.filters).subscribe((users) => {
  //     this.users = users.data;
  //     this.usersLength = users.total;
  //     this.totalPages = users.pages;
  //     this.pages = [];
  //     for (let index = 0; index < this.totalPages; index++) {
  //       this.pages.push(index + 1);
  //     }
  //   });
  // }

  openModalDelete(travelId: number) {
    var message = '¿Seguro de eliminar el registro?';
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
      try {
        console.log(travelId);
        await this._travelService.deleteTravel(travelId);
        this.page = 1;
        this.filters.page = 1;
        await this.getTravel();
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
      } catch (error) {
        this._snackBar.openFromComponent(SnackbarErrorComponent, {
          duration: 2500,
          data: {
            message:
              'Hubo un error al eliminar el registro, por favor inténtelo nuevamente',
          },
          panelClass: ['error-snackbar'],
        });
      }
    });
  }
  getCreatedAtMoment(created_at: Date) {
    // return moment(created_at).format('DD/MM/YYYY') + ' ' + hour;
    if (created_at) {
      try {
        const date = new Date(created_at);
        return `${this.datepipe.transform(date, 'dd/MM/yyyy')}`
      } catch (error) {
        return `${created_at}`
      }
    } else {
      return `-`
    }
  }
  getCreatedAtMomentHour(created_at: Date) {
    // return moment(created_at).format('DD/MM/YYYY') + ' ' + hour;
    if (created_at) {
      try {
        const date = new Date(created_at);
        return `${this.datepipe.transform(date, 'hh:mm:ss')}`
      } catch (error) {
        return `${created_at}`
      }
    } else {
      return `-`
    }
  }
}
