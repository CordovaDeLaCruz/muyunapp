import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { TravelMainComponent } from './pages/travel-main/travel-main.component';
import { TravelSpecieDetailComponent } from './pages/travel-specie-detail/travel-specie-detail.component';
import { SpecieRecordIdentifiedComponent } from './pages/specie-record-identified/specie-record-identified.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: TravelMainComponent,
      },
      {
        path: 'specie-detail/:id',
        component: TravelSpecieDetailComponent,
      },
      {
        path: 'specie-record-identified/:id',
        component: SpecieRecordIdentifiedComponent,
      },
      {
        path: '**',
        redirectTo: 'main',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelRoutingModule {}
