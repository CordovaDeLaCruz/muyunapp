import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/module/user/services/user.service';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { ModalSuccessComponent } from 'src/app/shared/components/modal-success/modal-success.component';
import { SnackbarErrorComponent } from 'src/app/shared/components/snackbar-error/snackbar.error.component';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-story-main',
  templateUrl: './story-main.component.html',
  styleUrls: ['./story-main.component.scss'],
  providers: [
    DatePipe
  ]
})
export class StoryMainComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  storyList: any = [];
  guidesList: any = [];

  displayedColumns: string[] = [
    'guide',
    'title',
    'story',
    'date',
    'condition',
    'actions',
  ];

  filters: any = {
    page: 1,
    limit: 10,
    is_app: null,
    guide_id: null,
    filter: null,
  };

  travelLength: number = 0;
  page = 1;
  totalPages = 0;
  pages = [];

  filtersUser: any = {
    page: 1,
    limit: 100,
    role: 'GUIDE'
  };

  constructor(
    private router: Router,
    private _snackbar: SnackbarComponent,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private _storyService: StoryService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getStories();
  }

  async getStories(){
    try {
      const response = await this._storyService.getStories(this.filters);
      this.storyList = response["data"].data
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
    await this._userService.getUsers(this.filtersUser).subscribe(
      (data) => {
        this.guidesList = data["data"]
      },
      (err) => {
        console.log(err);
      }
    )
  }

  async onSearchChange() {
    this.page = 1;
    this.filters.page = 1;
    await this.getStories();
  }

  async onPageEvent(event: any) {
    this.page = event;
    this.filters.page = event;
    await this.getStories();
  }

  openModalDelete(story: number) {
    var message = '¿Seguro de eliminar la historia?';
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
        console.log(story);
        await this._storyService.deleteStory(story);
        this.page = 1;
        this.filters.page = 1;
        await this.getStories();
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
              'Hubo un error al eliminar la historia, por favor inténtelo nuevamente',
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
