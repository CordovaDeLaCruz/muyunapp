import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./module/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'route',
    loadChildren: () =>
      import('./module/route/route.module').then((m) => m.RouteModule),
  },
  {
    path: 'specie',
    loadChildren: () =>
      import('./module/specie/specie.module').then((m) => m.SpecieModule),
  },
  {
    path: 'story',
    loadChildren: () =>
      import('./module/story/story.module').then((m) => m.StoryModule),
  },
  {
    path: 'travel',
    loadChildren: () =>
      import('./module/travel/travel.module').then((m) => m.TravelModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./module/user/user.module').then((m) => m.UserModule),
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./module/main/main.module').then((m) => m.MainModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: '**',
    redirectTo: '404',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
