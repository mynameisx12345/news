import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/auth/login', pathMatch: 'full'
  },
  {
    path: 'front-page',
    loadChildren: () => import('./front-page/front-page.module').then(m=>m.FrontPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./view-news/view-news.module').then(m=>m.ViewNewsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'section',
    loadChildren: () => import('./section-page/section-page.module').then(m=>m.SectionPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
