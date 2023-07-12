import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecieRoutingModule } from './specie-routing.module';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpecieMainComponent } from './pages/specie-main/specie-main.component';
import { AddUpdateSpecieComponent } from './pages/add-update-specie/add-update-specie.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SpecieMainComponent,
    AddUpdateSpecieComponent,
  ],
  imports: [
    CommonModule,
    SpecieRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SpecieModule { }
