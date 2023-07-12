import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule, SharedModule, MaterialModule],
})
export class LayoutModule {}
