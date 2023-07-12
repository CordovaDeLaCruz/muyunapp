import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { UserDataService, User } from 'src/app/module/user/services/user-data.service';
import { TravelService } from '../../services/travel.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-travel-specie-detail',
  templateUrl: './travel-specie-detail.component.html',
  styleUrls: ['./travel-specie-detail.component.scss'],
  providers: [
    DatePipe
  ]
})
export class TravelSpecieDetailComponent implements OnInit {

  showSpinner = false
  specieDetailId = null;

  IdentityList = [
    {
      name: 'SI',
      value: 1,
    },
    {
      name: 'NO',
      value: 0,
    },
  ];

  filters: any = {
    page: 1,
    limit: 10,
    identify: null,
    filter: null,
  };

  specieList: any[] = [];
  travelLength: number = 0;
  travelSpecieDetail: any;

  displayedColumns: string[] = [
    'taxon',
    'name_scientific',
    'name_verna',
    'view_count',
    'date',
    'hour',
    'latitude',
    'longitude',
    'identity_complete',
    'actions',
  ];

  usersLength: number = 0;
  clickedRows = null;

  filterField = new FormControl('');
  filterClass = new FormControl(null);
  filterPrevalence = new FormControl(null);
  page = 1;
  totalPages = 0;
  pages = [];
  travelObservationDetail: any;
  obsertavionIdentifyFlag: any;

  constructor(
    private userDataService: UserDataService,
    private router: Router,
    private userService: UserService,
    private _snackbar: SnackbarComponent,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private _travelService: TravelService,
    public datepipe: DatePipe
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.specieDetailId = params['id'];
    });
  }


  async ngOnInit() {
    //console.log(this.travel);

    if (this.specieDetailId) {
      await this.getTravelSpecieDetail(this.specieDetailId)
      await this.getSpecieTravel(this.specieDetailId);
    }
  }

  async getSpecieTravel(id: any) {
    try {
      const response = await this._travelService.getTravelObservations(id, this.filters);
      this.specieList = response["data"];
      this.travelLength = response["total"];
      this.totalPages = response["pages"];
      this.pages = [];
      for (let index = 0; index < this.totalPages; index++) {
        this.pages.push(index + 1);
      }
    } catch (error) {
      console.log(error);

    }
  }

  async getTravelSpecieDetail(id: any) {
    const response = await this._travelService.getTravelDetail(id);
    this.travelSpecieDetail = response;
  }

  async onSearchChange() {
    this.page = 1;
    this.filters.page = 1;
    await this.getSpecieTravel(this.specieDetailId);
  }

  getUserProfileLabel(profileValue: string) {
    return UserProfile.find((t) => t.value == profileValue)?.name;
  }

  detailTravelSpecie(id: any) {
    this._travelService.getTravelObservationDetail1(id).subscribe(
      res => {
        this.obsertavionIdentifyFlag = res.data.obsertavionIdentify;
        this._travelService.setObsertavionIdentify(res);
        this.router.navigate([`/travel/specie-record-identified/${id}`]);
      }
    );

  }

  openModalDelete(travelObservationId: number) {
    var message = '¿Estás seguro de eliminar el registro?';
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
        await this._travelService.deleteTravelObservation(travelObservationId);
        this.page = 1;
        this.filters.page = 1;
        await this.getSpecieTravel(this.specieDetailId);
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
