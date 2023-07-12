import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateUserComponent } from './pages/add-update-user/add-update-user.component';
import { UserMainComponent } from './pages/user-main/user-main.component';
import { LayoutComponent } from '../../layout/layout.component';
import { ReviewUserComponent } from './pages/review-user/review-user.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'add-user',
        component: AddUpdateUserComponent,
      },
      {
        path: 'update-user/:id',
        component: AddUpdateUserComponent,
      },
      {
        path: 'review-user',
        component: ReviewUserComponent,
      },
      {
        path: '',
        component: UserMainComponent,
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
export class UserRoutingModule {}
