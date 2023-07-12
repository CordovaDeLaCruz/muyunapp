import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SnackbarComponent } from '../../../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarErrorComponent } from 'src/app/shared/components/snackbar-error/snackbar.error.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalSuccessComponent } from 'src/app/shared/components/modal-success/modal-success.component';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { SpecieService } from '../../services/specie.service';
import { MatSelect } from '@angular/material/select';



import { UserService } from 'src/app/module/user/services/user.service';
import { UserProfile } from 'src/app/module/user/constants/user.constants';
import { UserDataService, User } from 'src/app/module/user/services/user-data.service';

@Component({
  selector: 'app-specie-main',
  templateUrl: './specie-main.component.html',
  styleUrls: ['./specie-main.component.scss']
})
export class SpecieMainComponent implements OnInit {
  @ViewChild('allSelectPrevalence') private allSelectPrevalence: MatSelect;
  allSelected = false;

  usersLength: number = 0;

  clickedRows = null;
  // New code
  classList: any = [];
  prevalenceList: any = [];
  specieList: any = [];
  page = 1;
  totalPages = 0;
  pages = [];
  filters: any = {
    page: 1,
    limit: 10,
    class_specie: null,
    prevalence_specie: null,
    filter: null,
    type_filter: 1
  };
  displayedColumns: string[] = [
    'classTaxonomy',
    'order',
    'family',
    'genus',
    'scientificName',
    'vern_Esp',
    'actions',
  ];
  constructor(
    private router: Router,
    private userService: UserService,
    private _snackbar: SnackbarComponent,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _specieService: SpecieService
  ) { }


  async ngOnInit(){
    await this.getViewSpecie();
    await this.getViewClass();
    await this.getViewPrevalence();
  }

  async getViewClass(){
    const response = await this._specieService.getViewClass();
    this.classList = response["data"]
  }
  async getViewPrevalence(){
    const response = await this._specieService.getViewPrevalence();
    this.prevalenceList = response["data"]
  }
  async getViewSpecie() {
    try {
      console.log(this.filters);

      const response = await this._specieService.getViewSpecie(this.filters);
      console.log(response["data"].data);

      this.specieList = response["data"].data
      this.usersLength = response["data"].total;
      this.totalPages = response["data"].pages;
      this.pages = [];
      for (let index = 0; index < this.totalPages; index++) {
        this.pages.push(index + 1);
      }
    } catch (error) {
      console.log(error);

    }
  }

  async filterText(text){
    if (text && text.length >= 2) {
      await this.getViewSpecie();
    }
  }
  async onSearchChange() {
    this.page = 1;
    this.filters.page = 1;
    await this.getViewSpecie();
  }

  togglePerOne(){
    if(this.filters.prevalence_specie.length == this.prevalenceList.length) {
      if (!this.allSelected) {
        this.allSelected = true;  // to control select-unselect
        this.allSelectPrevalence.options.forEach( (item) => item.select());
      } else {
        this.allSelected = false
        this.filters.prevalence_specie.splice(0,1)
        this.allSelectPrevalence.options["_results"][0].deselect()
      }
    }
    this.getViewSpecie()
  }

  toggleAllSelectionPrevalence() {
    this.allSelected = !this.allSelected;  // to control select-unselect
    if (this.allSelected) {
      console.log(this.allSelectPrevalence);
      this.allSelectPrevalence.options.forEach( (item) => item.select());
    } else {
      this.allSelectPrevalence.options.forEach( (item) => {item.deselect()});
    }
    this.getViewSpecie()
  }



  getUserProfileLabel(profileValue: string) {
    return UserProfile.find((t) => t.value == profileValue)?.name;
  }

  detailUser(specie: any) {
    // this.userDataService.setSelectedUser(user);
    this.router.navigate([`/specie/view-specie/${specie.id}`])
  }

  async onPageEvent(event: any) {
    this.page = event;
    this.filters.page = event;
    await this.getViewSpecie();
  }

  openModalDelete(specieId: number) {
    var message = '¿Estás seguro de eliminar la especie?';
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
        await this._specieService.deleteSpecie(specieId);
        this.page = 1;
        this.filters.page = 1;
        await this.getViewSpecie();
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
              'Hubo un error al eliminar la especie, por favor inténtelo nuevamente',
          },
          panelClass: ['error-snackbar'],
        });
      }
    });
  }

  gotToEditSpecie(id:any){
    this.router.navigate([`/specie/edit-specie/${id}`])
  }

}
