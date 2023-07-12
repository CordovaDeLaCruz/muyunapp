import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { SpecieMainComponent } from './pages/specie-main/specie-main.component';
import { AddUpdateSpecieComponent } from './pages/add-update-specie/add-update-specie.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: SpecieMainComponent,
      },
      {
        path: 'add-specie',
        component: AddUpdateSpecieComponent,
      },
      {
        path: 'edit-specie/:id',
        component: AddUpdateSpecieComponent,
      },
      {
        path: 'view-specie/:id',
        component: AddUpdateSpecieComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecieRoutingModule {}
