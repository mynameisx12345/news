import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CustomCommonModule } from '../shared/module/common/common.module';
import { ComponentsModule } from '../shared/components/components.module';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const routes: Routes= [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    CustomCommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
