import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserProfile } from 'src/app/module/user/constants/user.constants';
import { RouteService } from '../../service/route.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalSuccessComponent } from 'src/app/shared/components/modal-success/modal-success.component';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { SnackbarErrorComponent } from 'src/app/shared/components/snackbar-error/snackbar.error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-main',
  templateUrl: './route-main.component.html',
  styleUrls: ['./route-main.component.scss']
})
export class RouteMainComponent implements OnInit {
  filters: any = {
    page: 1,
    limit: 10,
    type_filter: 1
  };

  prevalenceList: any = [];
  classList: any = [];
  // New code
  routeList: any = [];
  routerLength: number = 0;
  page = 1;
  totalPages = 0;
  pages = [];
  displayedColumns: string[] = [
    'name',
    'kilometer',
    'actions',
  ];

  constructor(
    private _routeService: RouteService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,

  ) { }

  async ngOnInit() {
    await this.getViewRoutes();
  }

  async getViewRoutes() {
    try {
      const response = await this._routeService.getViewRoutes(this.filters);
      this.routeList = response["data"]
      this.routerLength = response["data"].total;
      this.totalPages = response["data"].pages;
      this.pages = [];
      console.log(this.routeList);
      for (let index = 0; index < this.totalPages; index++) {
        this.pages.push(index + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async onSearchChange() {
    // this.page = 1;
    this.filters.page = 1;
    // await this.getViewSpecie();
  }
  async filterText(text){
    if (text && text.length >= 2) {
      // await this.getViewSpecie();
    }
  }
  async onPageEvent(event: any) {
    this.page = event;
    this.filters.page = event;
    // await this.getViewSpecie();
  }

  detailRoute(router: any) {
    // this.userDataService.setSelectedUser(user);
    this.router.navigate([`/router/view-router/${router.id}`])
  }
  openModalDelete(routeId: number) {
    var message = '¿Estás seguro de eliminar la ruta?';
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
        console.log(routeId);
        await this._routeService.deleteRoute(routeId);
        this.page = 1;
        this.filters.page = 1;
        await this.getViewRoutes();
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
  gotToEditRoute(id:any){
    this.router.navigate([`/route/edit-route/${id}`])
  }
}
