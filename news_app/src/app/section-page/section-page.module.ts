import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionAComponent } from './section-a/section-a.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomCommonModule } from '../shared/module/common/common.module';
import { ComponentsModule } from '../shared/components/components.module';
import { FrontPageModule } from '../front-page/front-page.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyNewsListComponent } from './my-news-list/my-news-list.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { ViewNewsModule } from '../view-news/view-news.module';

const routes: Routes= [
  {
    path: 'section-a',
    component: SectionAComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
]

@NgModule({
  declarations: [
    SectionAComponent,
    DashboardComponent,
    MyNewsListComponent,
    AddNewsComponent
  ],
  imports: [
    CommonModule,
    CustomCommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    FrontPageModule,
    ViewNewsModule
  ]
})
export class SectionPageModule { }
