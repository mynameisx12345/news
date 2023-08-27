import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'front-page', pathMatch: 'full'
  },
  {
    path: 'front-page',
    loadChildren: () => import('./front-page/front-page.module').then(m=>m.FrontPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./view-news/view-news.module').then(m=>m.ViewNewsModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
