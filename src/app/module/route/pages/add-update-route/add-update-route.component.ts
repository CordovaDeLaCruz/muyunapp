import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';
import { RouteService } from '../../service/route.service';
import {
  isInvalid,
  setInputPattern,
  setValidatorPattern,
  setQuantifier,
} from "src/app/shared/helpers/custom-validation/validators-messages/validators-messages.component";
@Component({
  selector: 'app-add-update-route',
  templateUrl: './add-update-route.component.html',
  styleUrls: ['./add-update-route.component.scss']
})
export class AddUpdateRouteComponent implements OnInit {
  showSpinner = false
  routeId = null;
  isView: boolean = false

  form: FormGroup;
  isLoading = false;
  fileGeoJson = null
  fileGeoJsonName = null
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _snackBar: SnackbarComponent,
    private _routeService: RouteService
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
      this.routeId = params['id'];
    });
    this.form = this.fb.group({
      pathName: [{value:null, disabled: this.isView}, [Validators.required]],
      kilometer: [{value:null, disabled: this.isView}, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.routeId) {
      this.getRouteDetail(this.routeId)
    }
  }

  async getRouteDetail(id:any){
    this.showSpinner = true
    const response = await this._routeService.getRouteDetail(id);
    console.log(response["data"]);
    if (response["data"]) {
      Object.keys(response["data"]).forEach((key) => {
        if (this.form.get(key)) {
          if (key === 'kilometer') {
            const kilometer = response["data"][key].split(' km').splice(0).join('');
            this.form.get(key).setValue(kilometer);
          } else {
            this.form.get(key).setValue(response["data"][key])
          }
        }
      });
      if (response["data"].pathFile) {
        this.fileGeoJsonName = response["data"].pathFile
      }
    }
    this.showSpinner = false
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    console.log(file);
    if (!file) return;
    var format =  this.getFormatFile(file.name);
    if (format !== 'GEOJSON' && format !== 'SHP' && format !== 'GPX') {
      this._snackBar.showErrorSnackbar('El archivo agregado no tiene el formato correcto(.geojson, .shp o .gpx)');
      return
    }
    this.fileGeoJsonName = file.name;
    this.fileGeoJson = file;

  }
  removeFile(){
    this.fileGeoJson = null;
    this.fileGeoJsonName = null;
  }
  async submit(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    if (!this.routeId) {
      const data = this.form.value;
      data.pathFile = this.fileGeoJson;
      data.kilometer = data.kilometer + ' km'
      console.log(data);
      try {
        await this._routeService.newRoute(data);
        this.isLoading = false;
        console.log('Se creó');
        this._snackBar.showMessageSnackbar(
          `Se ha creado la ruta con éxito`
        );
        this.router.navigateByUrl('/route');

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
      data.pathFile = this.fileGeoJson;
      data.kilometer = data.kilometer + ' km'
      console.log('update', data);
      try {
        await this._routeService.updateRoute(this.routeId,data);
        this.isLoading = false;
        console.log('Se creactualizó');
        this._snackBar.showMessageSnackbar(
          `Se ha actualizado la ruta con éxito`
        );
        this.router.navigateByUrl('/route');
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
  getFormatFile(filename: string): string {
    const formatValue = filename
      .substr(filename.lastIndexOf('.') + 1)
      .toUpperCase();
    return formatValue;
  }
  // Validaciones
  setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }
  setValidatorPattern(
    _pattern: string,
    _quantifier: any,
    _exactStart?: boolean,
    _exactEnd?: boolean,
    _regexFlags?: string
  ): RegExp {
    return setValidatorPattern(
      _pattern,
      _quantifier,
      _exactStart,
      _exactEnd,
      _regexFlags
    );
  }
  setQuantifier(
    _quantifier1?: null | number | string,
    _quantifier2?: null | number
  ): {} {
    return setQuantifier(_quantifier1, _quantifier2);
  }
}
