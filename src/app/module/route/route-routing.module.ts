import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { RouteMainComponent } from './pages/route-main/route-main.component';
import { AddUpdateRouteComponent } from './pages/add-update-route/add-update-route.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: RouteMainComponent,
      },
      {
        path: 'add-route',
        component: AddUpdateRouteComponent,
      },
      {
        path: 'edit-route/:id',
        component: AddUpdateRouteComponent,
      },
      {
        path: 'view-route/:id',
        component: AddUpdateRouteComponent,
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
export class RouteRoutingModule {}
