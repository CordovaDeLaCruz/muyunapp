import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { RouteMainComponent } from './pages/route-main/route-main.component';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { AddUpdateRouteComponent } from './pages/add-update-route/add-update-route.component';


@NgModule({
  declarations: [
    RouteMainComponent,
    AddUpdateRouteComponent
  ],
  imports: [
    CommonModule,
    RouteRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class RouteModule { }
