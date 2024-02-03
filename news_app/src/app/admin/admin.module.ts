import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCommonModule } from '../shared/module/common/common.module';
import { ComponentsModule } from '../shared/components/components.module';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes= [
  {
    path: 'user-list',
    component: UserListComponent
  },
];

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    CustomCommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
