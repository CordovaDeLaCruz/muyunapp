import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { DocumentTypeList } from 'src/app/module/user/constants/documentType.constants';
import { Profile, UserProfile } from 'src/app/module/user/constants/user.constants';
import { SpecieService } from '../../services/specie.service';

@Component({
  selector: 'app-add-update-specie',
  templateUrl: './add-update-specie.component.html',
  styleUrls: ['./add-update-specie.component.scss']
})
export class AddUpdateSpecieComponent implements OnInit {
  showSpinner = false
  profileList = UserProfile;
  profileValueList = Profile;
  isView: boolean = false
  imageUrl = null;
  image = null;

  documentTypeList = DocumentTypeList;
  form: FormGroup;
  checkPhotoFormControl = new FormControl(false);

  specieId = null;
  isLoading = false;
  // New Code
  rankList: any = [];
  classList: any = [];
  kingdomList: any = [];
  phylumList: any = [];
  orderList: any = [];
  familyList: any = [];
  genusList: any = [];
  prevalenceList: any = [];
  habitatIconList: any = [];
  alimentIconList: any = [];
  colorList: any = [];
  sizeSpecieList: any = [];

  selectedAlimList: any = [];
  textAlimSpa: string = '';
  textAlimEng: string = '';
  selectedIconList: any = [];
  textIconSpa: string = '';
  textIconEng: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _snackBar: SnackbarComponent,
    private _specieService: SpecieService

  ) {
    var urlSplit = this.router.url.split("/")
    if (urlSplit) {
      if (urlSplit.length >= 2) {
        console.log("split :",urlSplit[2]);
        if (urlSplit[2] == "view-specie") {
          this.isView = true
        }
      }
    }
    this.activeRoute.params.subscribe((params) => {
      this.specieId = params['id'];
    });
    this.form = this.fb.group({
      scienticName: [{value:null, disabled: this.isView}, [Validators.required]],
      vernacularNameSpanish: [{value:null, disabled: this.isView}, [Validators.required]],
      vernacularNameEnglish: [{value:null, disabled: this.isView}, [Validators.required]],
      rankId: [{value:null, disabled: this.isView}, [Validators.required]],
      kingdomId: [{value:null, disabled: this.isView}, [Validators.required]],
      phylumId: [{value:null, disabled: this.isView}, [Validators.required]],
      classTaxonomyId: [{value:null, disabled: this.isView}, [Validators.required]],
      Clase_ESP: [{value:null, disabled: this.isView}, [Validators.required]],
      Clase_ENG: [{value:null, disabled: this.isView}, [Validators.required]],
      orderId: [{value:null, disabled: this.isView}, [Validators.required]],
      familyId: [{value:null, disabled: this.isView}, [Validators.required]],
      genusId: [{value:null, disabled: this.isView}, [Validators.required]],
      autorship: [{value:null, disabled: this.isView}, [Validators.required]],
      prevalences: [{value:null, disabled: this.isView}, [Validators.required]],
      habitatIcons: [{value:null, disabled: this.isView}, [Validators.required]],
      habitatNameSpanish: [{value:null, disabled: this.isView}, [Validators.required]],
      habitatNameEnglish: [{value:null, disabled: this.isView}, [Validators.required]],
      alimentIcons: [{value:null, disabled: this.isView}, [Validators.required]],
      alimentSpanish: [{value:null, disabled: this.isView}, [Validators.required]],
      alimentEnglish: [{value:null, disabled: this.isView}, [Validators.required]],
      descriptionNameSpanish: [{value:null, disabled: this.isView}, [Validators.required]],
      descriptionNameEnglish: [{value:null, disabled: this.isView}, [Validators.required]],
      factNameSpanish: [{value:null, disabled: this.isView}, [Validators.required]],
      factNameEnglish: [{value:null, disabled: this.isView}, [Validators.required]],
      colors: [{value:null, disabled: this.isView}, [Validators.required]],
      sizeId: [{value:null, disabled: this.isView}, [Validators.required]],
      taxon_id: [{value:null, disabled: this.isView}, ],

    });
    // SI SELECCIONA UNA CLASE
    this.form.get('classTaxonomyId')?.valueChanges
      .subscribe((id_class) => {
        const selectData =  this.classList.find((x) => { return x.id === id_class})
        if (selectData) {
          this.form.get('Clase_ESP').setValue(selectData.nameSpanish);
          this.form.get('Clase_ENG').setValue(selectData.nameEnglish);
        } else {
          this.form.get('Clase_ESP').setValue(null);
          this.form.get('Clase_ENG').setValue(null);
        }
      });
    // // SI SELECCIONA UNA CLASE
    // this.form.get('Alim_ICON')?.valueChanges
    //   .subscribe((id_alim_icon) => {
    //     const selectData =  this.alimentIconList.find((x) => { return x.id === id_alim_icon})
    //     if (selectData) {
    //       this.form.get('Alim_ESP').setValue(selectData.nameSpanish);
    //       this.form.get('Alim_ENG').setValue(selectData.nameEnglish);
    //     } else {
    //       this.form.get('Alim_ESP').setValue(null);
    //       this.form.get('Alim_ENG').setValue(null);
    //     }
    // });
    // // SI SELECCIONA UNA CLASE
    // this.form.get('Habitat_ICON')?.valueChanges
    //   .subscribe((id_habitat_icon) => {
    //     const selectData =  this.habitatIconList.find((x) => { return x.id === id_habitat_icon})
    //     if (selectData) {
    //       this.form.get('Habitat_ESP').setValue(selectData.nameSpanish);
    //       this.form.get('Habitat_ENG').setValue(selectData.nameEnglish);
    //     } else {
    //       this.form.get('Habitat_ESP').setValue(null);
    //       this.form.get('Habitat_ENG').setValue(null);
    //     }
    // });
  }

  ngOnInit(): void {
    this.getViewRank();
    this.getViewKingdom();
    this.getViewClass();
    this.getViewPhylum();
    this.getViewOrder();
    this.getViewFamily();
    this.getViewGenus();
    this.getViewPrevalence();
    this.getViewHabitatIcon();
    this.getViewAlimentIcon();
    this.getViewColor();
    this.getViewSizeSpecie();
    if (this.specieId) {
      this.getSpecieDetail(this.specieId)
    }

  }
  async getSpecieDetail(id:any){
    this.showSpinner = true
    const response = await this._specieService.getSpecieDetail(id);
    console.log(response["data"]);

    if (response["data"]) {
      Object.keys(response["data"]).forEach((key) => {
        if (this.form.get(key)) {
          this.form.get(key).setValue(response["data"][key])
        }
      });
      if (response["data"].id) {
        this.form.get('taxon_id').setValue(response["data"].id)
      }
      if (response["data"].photoUrl) {
        this.imageUrl = response["data"].photoUrl
        this.checkPhotoFormControl.setValue(true);
      }
    }
    this.showSpinner = false
  }


  async getViewRank(){
    const response = await this._specieService.getViewRank();
    this.rankList = response["data"]
  }

  async getViewKingdom(){
    const response = await this._specieService.getViewKingdom();
    this.kingdomList = response["data"]
  }

  async getViewPhylum(){
    const response = await this._specieService.getViewPhylum();
    this.phylumList = response["data"]
  }

  async getViewOrder(){
    const response = await this._specieService.getViewOrder();
    this.orderList = response["data"]
  }

  async getViewFamily(){
    const response = await this._specieService.getViewFamily();
    this.familyList = response["data"]
  }

  async getViewGenus(){
    const response = await this._specieService.getViewGenus();
    this.genusList = response["data"]
  }

  async getViewPrevalence(){
    const response = await this._specieService.getViewPrevalence();
    this.prevalenceList = response["data"]
  }

  async getViewHabitatIcon(){
    const response = await this._specieService.getViewHabitatIcon();
    this.habitatIconList = response["data"]
  }

  async getViewAlimentIcon(){
    const response = await this._specieService.getViewAlimentIcon();
    this.alimentIconList = response["data"]
  }

  async getViewColor(){
    const response = await this._specieService.getViewColor();
    this.colorList = response["data"]
  }

  async getViewSizeSpecie(){
    const response = await this._specieService.getViewSizeSpecie();
    this.sizeSpecieList = response["data"]
  }

  async getViewClass(){
    const response = await this._specieService.getViewClass();
    this.classList = response["data"]
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    console.log(file);
    console.log(event);

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

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    if (!this.specieId) {
      const data = this.form.value;
      data.photoUrl = this.image;
      console.log(data);
      try {
        await this._specieService.newSpecies(data);
        this.isLoading = false;
        console.log('Se creó');
        this._snackBar.showMessageSnackbar(
          `Se ha creado la especie con éxito`
        );
        this.router.navigateByUrl('/specie');

      } catch (error) {
        console.log(error);
        this.isLoading = false;
        if (error && error["error"] && error["error"].error.description) {
          this._snackBar.showErrorSnackbar(error["error"].error.description);
        } else {
          this._snackBar.showErrorSnackbar('Ha ocurrido un error. Por favor intentelo más tarde');
        }
      }
    } else {
      const data = this.form.value;
      data.photoUrl = this.image;
      console.log('update', data);
      try {
        await this._specieService.updateSpecies(this.specieId,data);
        this.isLoading = false;
        console.log('Se creactualizó');
        this._snackBar.showMessageSnackbar(
          `Se ha actualizado la especie con éxito`
        );
        this.router.navigateByUrl('/specie');
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        if (error && error["error"] && error["error"].error.description) {
          this._snackBar.showErrorSnackbar(error["error"].error.description);
        } else {
          this._snackBar.showErrorSnackbar('Ha ocurrido un error. Por favor intentelo más tarde');
        }
      }
    }
  }

  selectAlimIcon(data){
    const index = this.selectedAlimList.indexOf(data)
    if (index && index === -1) {
      this.selectedAlimList.push(data);
      this.textAlimSpa =  this.textAlimSpa === '' ? data.nameSpanish : this.textAlimSpa +'; '+ data.nameSpanish
      this.textAlimEng =  this.textAlimEng === '' ? data.nameEnglish : this.textAlimEng +'; '+ data.nameEnglish
    } else {
      if (this.selectedAlimList.length > 1) {
        const text_dividido_spa = this.textAlimSpa.split(data.nameSpanish);
        const text_dividido_eng = this.textAlimEng.split(data.nameEnglish);
        console.log(text_dividido_spa);
        console.log(text_dividido_eng);
        if (text_dividido_spa[0] === '' || text_dividido_spa[1] === '') {
          if (text_dividido_spa[0] === '') {
            text_dividido_spa.splice(0,1)
            text_dividido_spa[0] = text_dividido_spa[0].split(';').splice(1).join('; ');
          }
          if (text_dividido_spa[1] === '') {
            text_dividido_spa.splice(1,1)
          }
        } else {
          console.log('hace esto');
          text_dividido_spa[1] = text_dividido_spa[1].split(';').splice(1).join('; ');
          // text_dividido_spa.push(sub_texto_spa)
        }

        if (text_dividido_eng[0] === '' || text_dividido_eng[1] === '') {
          if (text_dividido_eng[0] === '') {
            text_dividido_eng.splice(0,1)
            text_dividido_eng[0] = text_dividido_eng[0].split(';').splice(1).join('; ');
          }
          if (text_dividido_eng[1] === '') {
            text_dividido_eng.splice(1,1)
            text_dividido_eng[1] = text_dividido_eng[1].split(';').splice(1).join('; ');
          }
        } else {
            text_dividido_eng[1] = text_dividido_eng[1].split(';').splice(1).join('; ');
            // text_dividido_eng.push(sub_texto_eng);
        }
        // text_dividido_spa.indexOf(data.nameSpanish)
        // console.log('encontrado', text_dividido_spa.indexOf(data.nameSpanish));
        console.log(text_dividido_spa);
        console.log(text_dividido_eng);
        var text_final_spa = ''
        var text_final_eng = ''
        text_dividido_spa.forEach(element => {
          text_final_spa = text_final_spa + element
        });
        text_dividido_eng.forEach(element => {
          text_final_eng = text_final_eng + element
        });
        this.textAlimSpa = text_final_spa.trim();
        this.textAlimEng = text_final_eng.trim();
      } else {
        this.textAlimSpa = ''
        this.textAlimEng = ''
      }
      this.selectedAlimList.splice(index,1);
    }
    this.form.get('alimentSpanish').setValue(this.textAlimSpa);
    this.form.get('alimentEnglish').setValue(this.textAlimEng);

    console.log("textAlimSpa: ",this.textAlimSpa);
    console.log("textAlimEng: ",this.textAlimEng);
    // console.log(this.selectedAlimList);
    // console.log(this.form.get('Alim_ICON').value);
  }
  selectHabitatIcon(data){
    const index = this.selectedIconList.indexOf(data)
    if (index && index === -1) {
      this.selectedIconList.push(data);
      this.textIconSpa =  this.textIconSpa === '' ? data.nameSpanish : this.textIconSpa +'; '+ data.nameSpanish
      this.textIconEng =  this.textIconEng === '' ? data.nameEnglish : this.textIconEng +'; '+ data.nameEnglish
    } else {
      if (this.selectedIconList.length > 1) {
        const text_dividido_spa = this.textIconSpa.split(data.nameSpanish);
        const text_dividido_eng = this.textIconEng.split(data.nameEnglish);
        console.log(text_dividido_spa);
        console.log(text_dividido_eng);
        if (text_dividido_spa[0] === '' || text_dividido_spa[1] === '') {
          if (text_dividido_spa[0] === '') {
            text_dividido_spa.splice(0,1)
            text_dividido_spa[0] = text_dividido_spa[0].split(';').splice(1).join('; ');
          }
          if (text_dividido_spa[1] === '') {
            text_dividido_spa.splice(1,1)
          }
        } else {
          console.log('hace esto');
          text_dividido_spa[1] = text_dividido_spa[1].split(';').splice(1).join('; ');
          // text_dividido_spa.push(sub_texto_spa)
        }

        if (text_dividido_eng[0] === '' || text_dividido_eng[1] === '') {
          if (text_dividido_eng[0] === '') {
            text_dividido_eng.splice(0,1)
            text_dividido_eng[0] = text_dividido_eng[0].split(';').splice(1).join('; ');
          }
          if (text_dividido_eng[1] === '') {
            text_dividido_eng.splice(1,1)
            text_dividido_eng[1] = text_dividido_eng[1].split(';').splice(1).join('; ');
          }
        } else {
            text_dividido_eng[1] = text_dividido_eng[1].split(';').splice(1).join('; ');
            // text_dividido_eng.push(sub_texto_eng);
        }
        // text_dividido_spa.indexOf(data.nameSpanish)
        // console.log('encontrado', text_dividido_spa.indexOf(data.nameSpanish));
        console.log(text_dividido_spa);
        console.log(text_dividido_eng);
        var text_final_spa = ''
        var text_final_eng = ''
        text_dividido_spa.forEach(element => {
          text_final_spa = text_final_spa + element
        });
        text_dividido_eng.forEach(element => {
          text_final_eng = text_final_eng + element
        });
        this.textIconSpa = text_final_spa.trim();
        this.textIconEng = text_final_eng.trim();
      } else {
        this.textIconSpa = ''
        this.textIconEng = ''
      }
      this.selectedIconList.splice(index,1);
    }
    this.form.get('habitatNameSpanish').setValue(this.textIconSpa);
    this.form.get('habitatNameEnglish').setValue(this.textIconEng);

    console.log("textIconSpa: ",this.textIconSpa);
    console.log("textIconEng: ",this.textIconEng);
    // console.log(this.selectedIconList);
    // console.log(this.form.get('Alim_ICON').value);
  }
}
