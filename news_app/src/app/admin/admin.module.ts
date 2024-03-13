import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCommonModule } from '../shared/module/common/common.module';
import { ComponentsModule } from '../shared/components/components.module';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedSettingsComponent } from './featured-settings/featured-settings.component';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';

const routes: Routes= [
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'featured',
    component: FeaturedSettingsComponent
  },
  {
    path: 'exam-schedule',
    component: ExamScheduleComponent
  }
];

@NgModule({
  declarations: [
    UserListComponent,
    FeaturedSettingsComponent,
    ExamScheduleComponent
  ],
  imports: [
    CommonModule,
    CustomCommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
