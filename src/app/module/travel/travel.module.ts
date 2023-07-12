import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelRoutingModule } from './travel-routing.module';
import { TravelMainComponent } from './pages/travel-main/travel-main.component';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TravelSpecieDetailComponent } from './pages/travel-specie-detail/travel-specie-detail.component';
import { FormsModule } from '@angular/forms';
import { SpecieRecordIdentifiedComponent } from './pages/specie-record-identified/specie-record-identified.component';
import { SpecieModalComponent } from './pages/specie-modal/specie-modal.component';

@NgModule({
  declarations: [
    TravelMainComponent,
    TravelSpecieDetailComponent,
    SpecieRecordIdentifiedComponent,
    SpecieModalComponent
  ],
  imports: [
    CommonModule,
    TravelRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class TravelModule { }
