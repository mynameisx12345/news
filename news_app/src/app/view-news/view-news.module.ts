import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedNewsComponent } from './selected-news/selected-news.component';
import { CustomCommonModule } from '../shared/module/common/common.module';
import { ComponentsModule } from '../shared/components/components.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'selected-news',
    component: SelectedNewsComponent
  }
]

@NgModule({
  declarations: [
    SelectedNewsComponent
  ],
  imports: [
    CommonModule,
    CustomCommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class ViewNewsModule { }
