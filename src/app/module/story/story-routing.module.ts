import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { AddUdpdateStoryComponent } from './pages/add-udpdate-story/add-udpdate-story.component';
import { StoryMainComponent } from './pages/story-main/story-main.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: StoryMainComponent
      },
      {
        path: 'add-story',
        component: AddUdpdateStoryComponent,
      },
      {
        path: 'update-story/:id',
        component: AddUdpdateStoryComponent,
      },
      {
        path: '**',
        redirectTo: 'main'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoryRoutingModule { }
