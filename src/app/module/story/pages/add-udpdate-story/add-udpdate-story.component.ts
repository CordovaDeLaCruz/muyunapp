import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecieModalComponent } from 'src/app/module/travel/pages/specie-modal/specie-modal.component';
import { TravelService } from 'src/app/module/travel/services/travel.service';
import { UserService } from 'src/app/module/user/services/user.service';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-add-udpdate-story',
  templateUrl: './add-udpdate-story.component.html',
  styleUrls: ['./add-udpdate-story.component.scss']
})
export class AddUdpdateStoryComponent implements OnInit {
  showSpinner = false;
  storyId = null;
  isLoading = false;
  form: FormGroup;
  checkPhotoFormControl = new FormControl(false);
  isView: boolean = false;

  guidesList: any = [];
  filtersUser: any = {
    page: 1,
    limit: 100,
    role: 'GUIDE'
  };

  imageUrl = null;
  image = null;
  speciesArrayBoolean: boolean = false;
  speciesList: any = [];
  speciesIdList: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _userService: UserService,
    private _storyService: StoryService,
    public dialog: MatDialog,
    private _travelService: TravelService,
    private _snackBar: SnackbarComponent
  ) {
    var urlSplit = this.router.url.split("/")
    if (urlSplit) {
      if (urlSplit.length >= 2) {
        if (urlSplit[2] == "view-travel") {
          this.isView = true
        }
      }
    }
    this.activeRoute.params.subscribe((params) => {
      this.storyId = params['id'];
    });

    this.form = this.fb.group({
      titleSpanish: [{ value: null, disabled: this.isView }, [Validators.required]],
      titleEnglish: [{ value: null, disabled: this.isView }, [Validators.required]],
      guideId: [{ value: null, disabled: this.isView }, [Validators.required]],
      descriptionSpanish: [{ value: null, disabled: this.isView }, [Validators.required]],
      descriptionEnglsih: [{ value: null, disabled: this.isView }, [Validators.required]],
      viewApp: [{ value: null, disabled: this.isView }],
      wordsSpanish: [{ value: null, disabled: this.isView }],
      wordsEnglish: [{ value: null, disabled: this.isView }],
      photoUrl: [{ value: null, disabled: this.isView }],
    })
  }

  ngOnInit(): void {
    //if (!this.storyId) return;
    //this.showSpinner = true;
    //this.showSpinner = false;
    if (this.storyId) {
      this.getStoryDetail(this.storyId)
    }
    this.getUsers();
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

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    //* if story update
    if (this.storyId) {
      this.form.get("wordsSpanish").setValue(this.speciesIdList);
      this.form.get("wordsEnglish").setValue(this.speciesIdList);
      if (!this.form.value.viewApp || this.form.value.viewApp == null) this.form.get("viewApp").setValue(0);
      else this.form.get("viewApp").setValue(1);
      this.form.get("photoUrl").setValue(this.image);
      const data = this.form.value;

      this._storyService
        .updateStory(this.storyId, data);
      this._snackBar.showMessageSnackbar(
        `Se ha actualizado la historia con éxito`
      );

      this.router.navigateByUrl('/story');
    } else {
      //* if story create
      this.form.get("wordsSpanish").setValue(this.speciesIdList);
      this.form.get("wordsEnglish").setValue(this.speciesIdList);
      if (!this.form.value.viewApp || this.form.value.viewApp == null) this.form.get("viewApp").setValue(0);
      else this.form.get("viewApp").setValue(1);
      this.form.get("photoUrl").setValue(this.image);
      const data = this.form.value;

      this._storyService
        .createStory(data)
        .subscribe((result) => {
          if (result.error) {
            this._snackBar.showErrorSnackbar(result.error.error.messageUser);
            this.isLoading = false;
            return;
          }

          this._snackBar.showMessageSnackbar(
            `Se ha creado la historia con éxito`
          );
          this.router.navigateByUrl('/story');
          this.isLoading = false;
          return;
        });
    }
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

  async getStoryDetail(id: any) {
    this.showSpinner = true
    const response = await this._storyService.getStoryDetail(id);

    if (response["data"]) {
      Object.keys(response["data"]).forEach((key) => {
        if (this.form.get(key)) {
          this.form.get(key).setValue(response["data"][key])
        }
      });
      if (response["data"].photoUrl) {
        this.imageUrl = response["data"].photoUrl
        this.checkPhotoFormControl.setValue(true);
      }
      if (response["data"].word) {
        response["data"].word.forEach(
          element => {
            this.speciesList.push(element.specie);
            this.speciesIdList.push(element.id);
          }
        )
      }
    }
    this.showSpinner = false
  }

  removeImage() {
    this.image = null;
    this.imageUrl = null;
  }

  selectSpecie() {
    console.log("seleccionar especie")
    this.speciesArrayBoolean = true;
    const dialogRef = this.dialog.open(SpecieModalComponent, {
      disableClose: true,
      autoFocus: false,
      width: '600px',
      height: '370px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let specie = null;
      this._travelService.specieDetailId$.subscribe(
        (res: any) => {
          specie = res
        }
      );
      if (specie != null) {
        this.speciesList.push(specie);
        this.speciesIdList.push(specie.id);
        console.log("speciesIdList", this.speciesIdList);
      }
    });
  }

}
