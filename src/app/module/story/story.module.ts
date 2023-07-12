import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoryRoutingModule } from './story-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { StoryMainComponent } from './pages/story-main/story-main.component';
import { AddUdpdateStoryComponent } from './pages/add-udpdate-story/add-udpdate-story.component';


@NgModule({
  declarations: [
    StoryMainComponent,
    AddUdpdateStoryComponent,

  ],
  imports: [
    CommonModule,
    StoryRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class StoryModule { }
