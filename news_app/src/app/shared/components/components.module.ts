import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CustomCommonModule } from '../module/common/common.module';
import { FooterComponent } from './footer/footer.component';
import { ViewMoreComponent } from './view-more/view-more.component';
import { CommentComponent } from './comment/comment.component';
import { ReactionComponent } from './reaction/reaction.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ViewMoreComponent,
    CommentComponent,
    ReactionComponent
  ],
  imports: [
    CommonModule,
    CustomCommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ViewMoreComponent,
    CommentComponent,
    ReactionComponent
  ]
})
export class ComponentsModule { }
