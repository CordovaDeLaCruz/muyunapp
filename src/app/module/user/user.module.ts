import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserMainComponent } from './pages/user-main/user-main.component';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { AddUpdateUserComponent } from './pages/add-update-user/add-update-user.component';
import { ReviewUserComponent } from './pages/review-user/review-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    UserMainComponent,
    AddUpdateUserComponent,
    ReviewUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class UserModule { }
