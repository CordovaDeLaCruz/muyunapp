import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { ModalSuccessComponent } from 'src/app/shared/components/modal-success/modal-success.component';
import { SnackbarErrorComponent } from 'src/app/shared/components/snackbar-error/snackbar.error.component';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { TravelService } from '../../services/travel.service';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { SpecieModalComponent } from '../specie-modal/specie-modal.component';

@Component({
  selector: 'app-specie-record-identified',
  templateUrl: './specie-record-identified.component.html',
  styleUrls: ['./specie-record-identified.component.scss'],
  providers: [
    DatePipe
  ]
})
export class SpecieRecordIdentifiedComponent implements OnInit {
  data: any = {
    count: 4,
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Andean_Cock_of_the_Rock%2C_Rupicola_peruviana_2.jpg'
  }

  travelObservationDetailId: any;
  travelObservationDetail: any;
  isView: boolean = false;
  form: FormGroup;
  identifiedFlag: boolean = false;
  formUpdate: FormGroup;
  obsertavionIdentifyFlag: boolean = false;
  imageUrl = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackbar: SnackbarComponent,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private _travelService: TravelService,
    private _location: Location,
    public datepipe: DatePipe
  ) {
    var urlSplit = this.router.url.split("/")
    // if (urlSplit) {
    //   if (urlSplit.length >= 2) {
    //     console.log("split :",urlSplit[2]);
    //     if (urlSplit[2] == "view-specie") {
    //       this.isView = true
    //     }
    //   }
    // }
    this.activeRoute.params.subscribe((params) => {
      this.travelObservationDetailId = params['id'];
    });

    //this._travelService.setspecieDetailId(this.travelObservationDetailId);

    this.form = this.fb.group({
      scienticName: [{ value: null, disabled: true }, [Validators.required]],
      vernacularNameSpanish: [{ value: null, disabled: true }, [Validators.required]],
      individualCount: [{ value: null, disabled: true }, [Validators.required]],
      longitude: [{ value: null, disabled: true }, [Validators.required]],
      latitude: [{ value: null, disabled: true }, [Validators.required]],
      registrarName: [{ value: null, disabled: true }, [Validators.required]],
      registrationDate: [{ value: null, disabled: true }, [Validators.required]],
      registrationHour: [{ value: null, disabled: true }, [Validators.required]],
      identifierName: [{ value: null, disabled: true }, [Validators.required]],
      identificationDate: [{ value: null, disabled: true }, [Validators.required]],
      identificationHour: [{ value: null, disabled: true }, [Validators.required]],

      comment: [{ value: null, disabled: true }, [Validators.required]],
      photoUrl: [{ value: null, disabled: this.isView }, [Validators.required]],
    });

    this.formUpdate = this.fb.group({
      specieId: [{ value: null }],
    })

    this._travelService.obsertavionIdentifyFlag$.subscribe(
      (res: any) => {
        this.obsertavionIdentifyFlag = res.data.obsertavionIdentify
      }
    );

  }

  ngOnInit(): void {
    if (this.travelObservationDetailId) {
      this.getTravelObservationDetail(this.travelObservationDetailId)
    }
    let specieDetailId = null;
    this._travelService.specieDetailId$.subscribe(
      (res: any) => {
        specieDetailId = res
      }
    );
  }

  async getTravelObservationDetail(id: any) {
    const response = await this._travelService.getTravelObservationDetail(id);
    this.travelObservationDetail = response;
    if (response["data"].specie) {
      this.form.get('scienticName').setValue(response["data"].specie.scienticName);
      this.form.get('vernacularNameSpanish').setValue(response["data"].specie.vernacularNameSpanish);
    }
    if (response["data"].individualCount) {
      this.form.get('individualCount').setValue(response["data"].individualCount);
    }
    if (response["data"].longitude) {
      this.form.get('longitude').setValue(response["data"].longitude);
    }
    if (response["data"].latitude) {
      this.form.get('latitude').setValue(response["data"].latitude);
    }
    if (response["data"].travel.passenger) {
      this.form.get('registrarName').setValue(response["data"].travel.passenger.firstName + " " + response["data"].travel.passenger.lastName);
    }
    if (response["data"].dateObservation) {
      this.form.get('registrationDate').setValue(this.getCreatedAtMoment(response["data"].dateObservation));
      this.form.get('registrationHour').setValue(this.getCreatedAtMomentHour(response["data"].dateObservation));
    }
    if (response["data"].adminName) {
      this.identifiedFlag = true;
      this.form.get('identifierName').setValue(response["data"].adminName);
    }
    if (response["data"].dateObservation) {
      this.form.get('identificationDate').setValue(this.getCreatedAtMoment(response["data"].updated_at));
      this.form.get('identificationHour').setValue(this.getCreatedAtMomentHour(response["data"].updated_at));
    }

    if (response["data"].specieId) {
      this.formUpdate.get('specieId').setValue(response["data"].specieId);
    }

    if (response["data"].individualCount) {
      this.form.get('individualCount').setValue(response["data"].individualCount)
    }
    if (response["data"].comment) {
      this.form.get('comment').setValue(response["data"].comment)
    }
    if (response["data"].photoUrl != null) {
      this.imageUrl = response["data"].photoUrl
    } else {
      if (response["data"].specie != null)
        this.imageUrl = response["data"].specie.photoUrl
    }
  }

  openModalDelete() {
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
        await this._travelService.deleteTravelObservation(this.travelObservationDetailId);
        this._location.back();
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

  openModalEdit() {
    const dialogRef = this.dialog.open(SpecieModalComponent, {
      disableClose: true,
      autoFocus: false,
      width: '600px',
      height: '370px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let specieId = null;
      this._travelService.specieDetailId$.subscribe(
        (res: any) => {
          specieId = res
        }
      );
      if (specieId != null) {
        this._travelService.updateSpecies(this.travelObservationDetailId, specieId.id);
        this.obsertavionIdentifyFlag = true;
        this.getTravelObservationDetail(this.travelObservationDetailId);
      }
    });
  }

  goToBack() {
    this._location.back();
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
