import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelService } from '../../services/travel.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-specie-modal',
  templateUrl: './specie-modal.component.html',
  styleUrls: ['./specie-modal.component.scss']
})
export class SpecieModalComponent implements OnInit {

  filters: any = {
    type_filter: 2,
    filter: " ",
  };

  filtersSearch: any = {
    type_filter: 2,
    filter: null,
  };

  displayedColumns: string[] = ['scienticName', 'vernacularNameSpanish'];

  specieList: any = [];
  travelObservationDetailId: any;

  constructor(
    public dialogRef: MatDialogRef<SpecieModalComponent>,
    private _travelService: TravelService,
    private activeRoute: ActivatedRoute,
    private router: Router,) {

  }
  async ngOnInit() {
    await this.getTravelSpecies();
  }

  async getTravelSpecies() {
    try {
      const response = await this._travelService.getModalSpecie(this.filters);
      this.specieList = response["data"].data;
    } catch (error) {
      console.log(error);

    }
  }

  async onSearchChange() {
    if (this.filtersSearch.filter != "") {
      try {
        const response = await this._travelService.getModalSpecie(this.filtersSearch);
        this.specieList = response["data"].data;
      } catch (error) {
        console.log(error);
      }
    } else {
      this.getTravelSpecies();
    }

  }

  onNoClick(): void {
    this.dialogRef.close()
    this._travelService.setspecieDetailId(null);
  }

  async clickTable(specie: any) {
    this._travelService.setspecieDetailId(specie);
    this.dialogRef.close()
  }
}
