import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopStoriesComponent } from './top-stories/top-stories.component';
import { FrontPageViewComponent } from './front-page-view/front-page-view.component';
import { CustomCommonModule } from '../shared/module/common/common.module';
import { SubStoriesComponent } from './sub-stories/sub-stories.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ComponentsModule } from '../shared/components/components.module';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {
    path: '',
    component: FrontPageViewComponent
  }
]

@NgModule({
  declarations: [
    FrontPageViewComponent,
    TopStoriesComponent,
    SubStoriesComponent,
    NewsListComponent,
    ExamScheduleComponent,
    EventsComponent
  ],
  imports: [
    CommonModule,
    CustomCommonModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ]
})
export class FrontPageModule { }
